
export default {
  SELECT_FORMULA_LIST: `/formulaController/selectFormulaList`, //查询质量管理列表
  SELECT_SCOPE_LIST: `/deptInfoController/searchSelectScopeList`, //查询医院列表
  SELECT_FORMULA_DETAIL: `/formulaDetailController/selectFormulaDetail`,//查询指标信息详情
  SELECT_CODE: `/formulaController/selectTemplateDetail`,//查询建设科室公式记录
  SEARCH_DEPT_LIST: `/deptInfoController/searchConstrDeptAuditList`,//查询科室信息审核列表
  SEARCH_FORMULA_DETAILS: `/formulaController/selectAllYearFornla`,//医院机构质量指标详情
  UPDATE_FORMULA_DETAILS: `/formulaDetailController/updateFormulaDetail`,//质量上报新增/暂存
  UPLOADPIC: `http://120.26.128.15:8903/ftp/post`,//查询指标信息详情
  LOADPIC: `http://120.26.128.15:8903/ftp/`,//查询指标信息详情
  INSERT_CONSTR_DEPT: `/deptInfoController/insertEditConstrDept`,//新建/编辑本机构科室上报信息
  UPDATE_FORMULA: `/formulaDetailController/updateFormulaFstate`,//审核指标信息
  EXPORT_FORNLA: `/formulaController/exporAllYearFornla`,//质量列表导出

  //科室
  GET_DEPT_INFO: `/deptInfoController/getDeptInfo`,//按年度查询机构的床位数、机构员工总数、医工人员总数、医工培训总数
  GET_DEPT_AGE: `/deptInfoController/getDeptUserAge`, //按年度查询医工人员年龄情况
  GET_DEPT_EDUCATION: `/deptInfoController/getDeptUserEducation`,//医工人员学历情况
  GET_DEPT_MAJOR: `/deptInfoController/getDeptUserMajor`,//医工人员专业情况
  GET_DEPT_USER_LIST: `/deptInfoController/searchConstrDeptUserList`,//科室人员信息列表
  UPDATE_DEPT: `/deptInfoController/updateConstrDept`,//科室审核
  //登录
  USERLOGIN :`/login/userLogin`,//查询用户列表
  USERREGISTER :`/user/registerUserInfo`,//查询用户注册
  CHECK_LOGIN: `/login/getUserInfo`,//登录校验

  //注册
  //用户模块
  SEARCH_USER_LIST :`/user/findAllUserList`,//查询用户列表
  RESET_PASSWORD: `/user/resetUserPwd`,//重置密码
  ADDUPDATEUSER :`/user/addUpdateUser`,//查询用户注册
  AUDITUSERINFO :`/user/auditUserInfo`,//用户管理-注册用户审核
  
  //机构
  SEARCH_ORGS: `/orgController/findOrgs`,//查询机构
  SEARCH_QCORGS: `/orgController/findOrgs?orgType=3`,//查询机构
  SEARCH_ORGS_LIST: `/orgController/findAllOrgList`, //查询所有机构
  ADD_ORG: `/orgController/addUpdateOrgInfo`,//新增更新机构
  SEARCH_CONSTR_DEPT: `/deptInfoController/searchConstrDept`,//查询科室上报情况
  //获取省市区级联菜单
  CITY: `/js/City.json`,

  //HOME页面相关
  ORG_INFO: `/deptInfoController/getOrgInfoTb`,
  ORG_GENDER: `/deptInfoController/getOrgDeptInfoByGender`, //医工人数
  ORG_EDUCATION: `/deptInfoController/getOrgEducation`,//学历
  ORG_ADVERSE: `/deptInfoController/getAdverseEvents`,//不良事件
  ORG_TRACE: `/deptInfoController/getMaterialTraceability`,//耗材追溯
  ORG_LEVEL: `/deptInfoController/getOrgAllLevel`,//机构分布

  //问卷调查内容
  REPORT_PCS_JSON: `/address`,//获取省市区联动json

  //问卷调查修改密码
  CHANGEPwd:`/user/modifyUserPwd`,

  //问卷调查01
  QUERY_UserInfo:`/investigation/getInvestigationUser`,//查询
  ADD_UserInfo:`/investigation/addUpdateInvestigationUser`,
 
  //问卷调查02
  QUERY_Hospital:`/investigation/getInvestigationOrg`,//查询
  ADD_Hospital:`/investigation/addUpdateInvestigationOrg`,

  //问卷调查51
  QUERY_HEquipment:`/investigation/getInvestigationEquipment`,//查询
  ADD_HEquipment:`/investigation/addUpdateInvestigationEquipment`,

  //问卷调查52
  QUERY_Supplies:`/investigation/getInvestigationSupplies`,//查询
  ADD_Supplies:`/investigation/addUpdateInvestigationSupplies`,

  //问卷调查53
  QUERY_Repair:`/investigation/getInvestigationRepair`,//查询
  ADD_Repair:`/investigation/addUpdateInvestigationRepair`,
  
  //问卷调查54
  QUERY_Qc:`/investigation/getInvestigationQc`,//查询
  ADD_Qc:`/investigation/addUpdateInvestigationQc`,

  //问卷调查61
  QUERY_Equipment:`/investigation/selectInvestigationEqipmerL`,//查询
  ADD_Equipment:`/investigation/insertInvestigationEqipmerL`,//新增-修改

  //问卷调查62
  QUERY_Management:`/investigation/selectInvestigationSuppliesL`,//查询
  ADD_Management:`/investigation/insertInvestigationSuppliesL`,//新增-修改

  //问卷调查
  QUESTION_3: `/investigation/insertEditConstrDept`, //3, 4新增编辑
  QUSETION3_BACK: `/investigation/getInvestigationDept`, // 3回填
  QUESTION4_BACK: `/investigation/getInvestigationDeptUser`, // 4回填
}