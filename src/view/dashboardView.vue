<template>
  <div class="dashboard-container">
    <!-- 顶部标题和操作区 -->
    <div class="header">
      <h1>数据仪表盘</h1>
      <div class="header-actions">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        />
        <el-button type="primary" size="small" :icon="Refresh" @click="refreshData">刷新</el-button>
        <el-button type="primary" size="small" @click="logout">登出</el-button>
      </div>
    </div>

    <!-- 统计卡片区 -->
    <div class="stat-cards">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" v-for="(card, index) in statCards" :key="index">
          <el-card shadow="hover" class="stat-card" :style="{borderTop: `4px solid ${card.color}`}">
            <div class="card-content">
              <div class="card-icon" :style="{backgroundColor: card.color}">
                <component :is="card.icon" style="color: white" />
              </div>
              <div class="card-info">
                <div class="card-title">{{ card.title }}</div>
                <div class="card-value">{{ card.value }}</div>
                <div class="card-trend" :style="{color: card.trend > 0 ? '#67C23A' : '#F56C6C'}">
                  <span>{{ card.trend > 0 ? '↑' : '↓' }} {{ Math.abs(card.trend) }}%</span>
                  <span>较上月</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 图表区 -->
    <div class="chart-area">
      <el-row :gutter="20">
        <el-col :xs="24" :md="16">
          <el-card shadow="hover">
            <template #header>
              <div class="chart-header">
                <span>访问量趋势</span>
                <el-radio-group v-model="visitChartType" size="small">
                  <el-radio-button label="week">周</el-radio-button>
                  <el-radio-button label="month">月</el-radio-button>
                  <el-radio-button label="year">年</el-radio-button>
                </el-radio-group>
              </div>
            </template>
            <div ref="visitChart" style="height: 300px;"></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-card shadow="hover">
            <template #header>
              <span>流量来源</span>
            </template>
            <div ref="sourceChart" style="height: 300px;"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 表格区 -->
    <div class="table-area">
      <el-card shadow="hover">
        <template #header>
          <div class="table-header">
            <span>最近订单</span>
            <el-button type="primary" size="small" @click="exportData">导出数据</el-button>
          </div>
        </template>
        <el-table
          :data="tableData"
          style="width: 100%"
          stripe
          v-loading="tableLoading"
        >
          <el-table-column prop="id" label="订单ID" width="100" />
          <el-table-column prop="customer" label="客户" width="120" />
          <el-table-column prop="product" label="产品" />
          <el-table-column prop="amount" label="金额" width="120">
            <template #default="{row}">
              ¥{{ row.amount.toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template #default="{row}">
              <el-tag :type="statusTagType(row.status)" size="small">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期" width="120" />
          <el-table-column label="操作" width="120">
            <template #default>
              <el-button size="small" type="text">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="totalItems"
            @current-change="handlePageChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {
  Refresh,
  User,
  ShoppingCart,
  Money,
  TrendCharts
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'DashboardView',
  
  components: {
    Refresh,
    User,
    ShoppingCart,
    Money,
    TrendCharts
  },
  
  data() {
    return {
      // 统计卡片数据
      statCards: [
        {
          title: '总用户数',
          value: '12,856',
          trend: 12.5,
          icon: User,
          color: '#409EFF'
        },
        {
          title: '订单数量',
          value: '2,341',
          trend: -3.4,
          icon: ShoppingCart,
          color: '#67C23A'
        },
        {
          title: '销售额',
          value: '¥345,210',
          trend: 18.2,
          icon: Money,
          color: '#E6A23C'
        },
        {
          title: '访问量',
          value: '56,789',
          trend: 8.7,
          icon: TrendCharts,
          color: '#F56C6C'
        }
      ],
      dateRange: [new Date(2023, 0, 1), new Date()],
      visitChartType: 'month',
      tableData: [
        { id: '1001', customer: '张三', product: '高端智能手机', amount: 5999, status: '已完成', date: '2023-05-15' },
        { id: '1002', customer: '李四', product: '无线耳机', amount: 399, status: '已发货', date: '2023-05-16' },
        { id: '1003', customer: '王五', product: '智能手表', amount: 1299, status: '待付款', date: '2023-05-16' },
        { id: '1004', customer: '赵六', product: '笔记本电脑', amount: 8999, status: '已完成', date: '2023-05-17' },
        { id: '1005', customer: '钱七', product: '平板电脑', amount: 3299, status: '已取消', date: '2023-05-18' },
        { id: '1006', customer: '孙八', product: '智能音箱', amount: 599, status: '已完成', date: '2023-05-19' },
        { id: '1007', customer: '周九', product: '显示器', amount: 1599, status: '已发货', date: '2023-05-20' },
        { id: '1008', customer: '吴十', product: '机械键盘', amount: 499, status: '已完成', date: '2023-05-21' }
      ],
      tableLoading: false,
      currentPage: 1,
      pageSize: 8,
      totalItems: 32,
      visitChartInstance: null,
      sourceChartInstance: null
    }
  },
  
  methods: {
    logout(){
        localStorage.removeItem('user')
        this.$router.push('/');
    },
    // 状态标签类型
    statusTagType(status) {
      const map = {
        '已完成': 'success',
        '已发货': '',
        '待付款': 'warning',
        '已取消': 'danger'
      }
      return map[status] || ''
    },
    
    // 刷新数据
    refreshData() {
      this.tableLoading = true
      setTimeout(() => {
        this.tableLoading = false
      }, 800)
    },
    
    // 导出数据
    exportData() {
      ElMessage.success('导出数据成功')
    },
    
    // 分页变化
    handlePageChange(val) {
      console.log(`当前页: ${val}`)
    },
    
    // 初始化图表
    initCharts() {
      // 访问量趋势图
      this.visitChartInstance = echarts.init(this.$refs.visitChart)
      const visitOption = {
        // 图表配置...
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: {
            lineStyle: {
              color: '#DCDFE6'
            }
          },
          axisLabel: {
            color: '#606266'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#DCDFE6'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#EBEEF5'],
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#606266'
          }
        },
        series: [
          {
            name: '访问量',
            type: 'line',
            smooth: true,
            data: [120, 200, 150, 80, 70, 110, 130, 180, 210, 190, 250, 300],
            itemStyle: {
              color: '#409EFF'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(64, 158, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(64, 158, 255, 0.1)'
                }
              ])
            }
          }
        ]
      }
      this.visitChartInstance.setOption(visitOption)

      // 流量来源图
      this.sourceChartInstance = echarts.init(this.$refs.sourceChart)
      const sourceOption = {
        // 图表配置...
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            color: '#606266'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '搜索引擎', itemStyle: { color: '#409EFF' } },
              { value: 735, name: '直接访问', itemStyle: { color: '#67C23A' } },
              { value: 580, name: '社交媒体', itemStyle: { color: '#E6A23C' } },
              { value: 484, name: '邮件营销', itemStyle: { color: '#F56C6C' } },
              { value: 300, name: '其他', itemStyle: { color: '#909399' } }
            ]
          }
        ]
      }
      this.sourceChartInstance.setOption(sourceOption)
    },
    
    // 处理窗口大小变化
    handleResize() {
      if (this.visitChartInstance) this.visitChartInstance.resize()
      if (this.sourceChartInstance) this.sourceChartInstance.resize()
    }
  },
  
  watch: {
    visitChartType(newVal) {
      if (this.visitChartInstance) {
        let xData = []
        let seriesData = []
        
        if (newVal === 'week') {
          xData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          seriesData = [120, 200, 150, 80, 70, 110, 130]
        } else if (newVal === 'month') {
          xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          seriesData = [120, 200, 150, 80, 70, 110, 130, 180, 210, 190, 250, 300]
        } else {
          xData = ['2020', '2021', '2022', '2023']
          seriesData = [800, 1200, 1500, 2000]
        }
        
        this.visitChartInstance.setOption({
          xAxis: { data: xData },
          series: [{ data: seriesData }]
        })
      }
    }
  },
  
  mounted() {
    this.initCharts()
    window.addEventListener('resize', this.handleResize)
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    if (this.visitChartInstance) this.visitChartInstance.dispose()
    if (this.sourceChartInstance) this.sourceChartInstance.dispose()
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  color: #303133;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 6px;
  margin-bottom: 20px;
}

.card-content {
  display: flex;
  align-items: center;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.card-value {
  font-size: 22px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.card-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.chart-area {
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-area {
  margin-bottom: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .card-content {
    flex-direction: column;
    text-align: center;
  }
  
  .card-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>