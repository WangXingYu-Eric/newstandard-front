<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-tabs v-if="workOrderSettings" v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane v-for="categorizedSettings in workOrderSettings.children" :key="categorizedSettings.id" :name="String(categorizedSettings.id)" :label="categorizedSettings.label">
              <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200">
                  <el-form ref="form" :model="form" label-width="100px" size="small" style="display:-webkit-box;-webkit-box-orient:vertical;height:100%;">
                    <div style="-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:auto;">
                      <el-card>
                        <div slot="header" class="clearfix">
                          <span>基本信息</span>
                        </div>
                        <el-row>
                          <el-col :span="6" :offset="1">
                            <el-form-item label="服务单号" label-width="130px">
                              <el-input v-model="form.name" :disabled="true" placeholder="服务单号" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" :offset="2">
                            <el-form-item label="来电人姓名" label-width="130px">
                              <el-input v-model="form.name" :disabled="true" placeholder="来电人姓名" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" :offset="2">
                            <el-form-item label="性别">
                              <el-input v-model="form.name" :disabled="true" placeholder="性别" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="6" :offset="1">
                            <el-form-item label="来电号码" label-width="130px">
                              <el-input v-model="form.name" :disabled="true" placeholder="来电号码" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" :offset="2">
                            <el-form-item label="来电时间" label-width="130px">
                              <el-input v-model="form.name" :disabled="true" placeholder="来电时间" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" :offset="2">
                            <el-form-item label="来电地区">
                              <el-input v-model="form.name" :disabled="true" placeholder="来电地区" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="6" :offset="1">
                            <el-form-item label="身份证号码" label-width="130px">
                              <el-input v-model="form.name" :disabled="true" placeholder="身份证号码" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" :offset="2">
                            <el-form-item label="客户身份" label-width="130px">
                              <el-input v-model="form.name" :disabled="true" placeholder="客户身份" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" :offset="2">
                            <el-form-item label="备注">
                              <el-input v-model="form.name" :disabled="true" placeholder="备注" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="6" :offset="1">
                            <el-form-item label="服务来源" label-width="130px">
                              <el-select v-model="form.source" placeholder="服务来源" :disabled="true" style="width: 100%">
                                <el-option label="呼入" value="callIn" />
                                <el-option label="外呼" value="beijing" />
                                <el-option label="留言处理" value="beijing" />
                                <el-option label="IVR处理" value="beijing" />
                                <el-option label="理赔" value="beijing" />
                                <el-option label="保全" value="beijing" />
                                <el-option label="回访" value="beijing" />
                                <el-option label="在线客服" value="beijing" />
                                <el-option label="保监投诉" value="beijing" />
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-card>
                      <el-card class="mt-10">
                        <div slot="header" class="clearfix">
                          <span>服务项目明细</span>
                        </div>
                        <el-scrollbar ref="treeScrollbar" wrap-class="scrollbar-wrapper">
                          <el-tree
                            v-if="treeList"
                            ref="tree"
                            style="height:244px"
                            node-key="id"
                            highlight-current
                            :show-checkbox="true"
                            :data="treeList"
                            :expand-on-click-node="true"
                          />
                        </el-scrollbar>
                      </el-card>
                      <el-card class="mt-10">
                        <div slot="header" class="clearfix">
                          <span>取回保单</span>
                        </div>
                        <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
                          <div style="height:244px">
                            <el-table ref="table" :key="0" :data="policyData" row-key="id" stripe highlight-current-row>
                              <el-table-column type="selection" min-width="55" />
                              <el-table-column label="保单号码" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
                              </el-table-column>
                              <el-table-column label="投保人" align="center" min-width="100">
                                <template slot-scope="scope"><span>{{ scope.row.applicant }}</span></template>
                              </el-table-column>
                              <el-table-column label="客户号" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.customerNo }}</span></template>
                              </el-table-column>
                              <el-table-column label="被保人姓名" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.insured }}</span></template>
                              </el-table-column>
                              <el-table-column label="代理机构" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.agent }}</span></template>
                              </el-table-column>
                              <el-table-column label="生效日期" align="center" min-width="200">
                                <template slot-scope="scope"><span>{{ scope.row.effectiveDate }}</span></template>
                              </el-table-column>
                              <el-table-column label="保费金额" align="center" min-width="100">
                                <template slot-scope="scope"><span>{{ scope.row.premium }}</span></template>
                              </el-table-column>
                              <el-table-column label="险种名称" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.typeOfInsurance }}</span></template>
                              </el-table-column>
                              <el-table-column label="募集计划名称" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.planck }}</span></template>
                              </el-table-column>
                              <el-table-column label="保单状态" align="center" min-width="100">
                                <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
                              </el-table-column>
                              <el-table-column label="操作" align="center" fixed="right" min-width="250">
                                <template>
                                  <el-button type="primary" size="mini">
                                    取回保单
                                  </el-button>
                                  <el-button type="danger" size="mini">
                                    删除保单
                                  </el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
                        </el-scrollbar>
                      </el-card>
                      <el-card class="mt-10">
                        <div slot="header" class="clearfix">
                          <span>坐席摘要</span>
                        </div>
                        <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
                          <div style="height:244px">
                            <quill-editor ref="text" v-model="content" style="height:200px" class="myQuillEditor" :options="editorOption" :disabled="true" />
                          </div>
                        </el-scrollbar>
                      </el-card>
                      <el-card style="margin-top: 10px;margin-bottom: 10px">
                        <div slot="header" class="clearfix">
                          <span>工单转办</span>
                        </div>
                        <el-row>
                          <el-col :span="6" :offset="1">
                            <el-form-item label="转办机构">
                              <el-select v-model="form.a" placeholder="转办机构" :disabled="true" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" :offset="2">
                            <el-form-item label="转办部门">
                              <el-select v-model="form.b" placeholder="转办部门" :disabled="true" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" :offset="2">
                            <el-form-item label="转办岗位">
                              <el-select v-model="form.c" placeholder="转办岗位" :disabled="true" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-card>
                    </div>
                    <el-card style="width: calc(100% - 6px);">
                      <el-row>
                        <el-col :span="24">
                          <div class="fr">
                            <!--<el-button type="success" size="small">新建</el-button>-->
                            <!--<el-button type="info" size="small">取消</el-button>-->
                            <!--<el-button type="primary" size="small">保存</el-button>-->
                            <el-button type="primary" size="small">修改</el-button>
                            <el-button type="primary" size="small">工单录音</el-button>
                          </div>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-form>
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="流程明细" name="second">
              <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200">
                  <div style="-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:auto;">
                    <el-row>
                      <el-col :span="14">
                        <el-card class="box-card" v-bind:style="{height: widthData2}">
                          <div slot="header" class="clearfix">
                            <span>工单流程图</span>
                          </div>
                          <img src="http://39.105.54.133:10008/modeler/37518/1/showModelGLTaskPicture">
                        </el-card>
                      </el-col>
                      <el-col :span="7">
                        <el-row>
                          <el-card class="box-card" v-bind:style="{height: widthData}">
                            <div class="text item">
                              <el-row>
                                <el-input v-model="input1">
                                  <template slot="prepend">流程状态：</template>
                                </el-input>
                              </el-row>
                              <el-row>
                                <el-input v-model="input1_time">
                                  <template slot="prepend">操作时间：</template>
                                </el-input>
                              </el-row>
                              <el-row>
                                <el-input v-model="input1_user">
                                  <template slot="prepend">操作人：&#12288; </template>
                                </el-input>
                              </el-row>
                            </div>
                          </el-card>
                        </el-row>
                        <el-row>
                          <el-card class="box-card" v-bind:style="{height: widthData}">
                            <div class="text item">
                              <el-row>
                                <el-input v-model="input2">
                                  <template slot="prepend">流程状态：</template>
                                </el-input>
                              </el-row>
                              <el-row>
                                <el-input v-model="input2_time">
                                  <template slot="prepend">操作时间：</template>
                                </el-input>
                              </el-row>
                              <el-row>
                                <el-input v-model="input2_user">
                                  <template slot="prepend">操作人：&#12288; </template>
                                </el-input>
                              </el-row>
                            </div>
                          </el-card>
                        </el-row>
                        <el-row>
                          <el-card class="box-card" v-bind:style="{height: widthData}">
                            <div class="text item">
                              <el-row>
                                <el-input v-model="input3">
                                  <template slot="prepend">流程状态：</template>
                                </el-input>
                              </el-row>
                              <el-row>
                                <el-input v-model="input3_time">
                                  <template slot="prepend">操作时间：</template>
                                </el-input>
                              </el-row>
                              <el-row>
                                <el-input v-model="input3_user">
                                  <template slot="prepend">操作人：&#12288; </template>
                                </el-input>
                              </el-row>
                            </div>
                          </el-card>
                        </el-row>
                        <el-row>
                          <el-card class="box-card" v-bind:style="{height: widthData}">
                            <div class="text item">
                              <el-row>
                                <el-input v-model="input4">
                                  <template slot="prepend">流程状态：</template>
                                </el-input>
                              </el-row>
                              <el-row>
                                <el-input v-model="input4_time">
                                  <template slot="prepend">操作时间：</template>
                                </el-input>
                              </el-row>
                              <el-row>
                                <el-input v-model="input4_user">
                                  <template slot="prepend">操作人：&#12288; </template>
                                </el-input>
                              </el-row>
                            </div>
                          </el-card>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 用于获取工单配置信息
import { fetchList } from '@/api/workOrderManagement/registration'

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      workOrderSettings: {
        children: [
          {
            id: '123',
            label: '工单详情'
          }
        ]
      },
      activeTab: String('123'),
      treeList: null,
      input1: '发起工单',
      input1_time: '2019-05-20 12:00:36',
      input1_user: 'T1',
      input2: '工单处理',
      input2_time: '2019-05-20 12:00:36',
      input2_user: 'T2',
      input3: '工单转办',
      input3_time: '2019-05-20 12:00:36',
      input3_user: 'TY',
      input4: '工单完成',
      input4_time: '2019-05-20 12:00:36',
      input4_user: 'TO',
      widthData: '150px',
      widthData2: '600px',
      form: {
        source: 'callIn',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        activeName: 'second'
      },
      policyData: [
        {
          id: '1',
          applicant: '张三',
          customerNo: '0001',
          insured: '李四',
          agent: '代理机构',
          effectiveDate: '2019-01-01',
          premium: '10000',
          typeOfInsurance: '重疾险',
          plan: '募集计划',
          status: '生效中'
        }
      ],
      content: '',
      editorOption: {}
    }
  },
  created() {
    this.$nextTick(function() {
      fetchList().then((response) => {
        // console.log('12312312==' + JSON.stringify(response.data.items[0]))
        this.treeList = response.data.items[0].children
        // this.activeTab = String(this.workOrderSettings.children[0].id)
      })
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
