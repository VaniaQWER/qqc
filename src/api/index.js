
export default {
  SELECT_FORMULA_LIST: `/formulaController/selectFormulaList`, //查询质量管理列表
  SELECT_SCOPE_LIST: `/deptInfoController/searchSelectScopeList`, //查询医院列表
  SELECT_FORMULA_DETAIL: `/formulaDetailController/selectFormulaDetail`,//查询指标信息详情
  SELECT_CODE: `/formulaController/selectTemplateDetail`,//查询建设科室公式记录
  SEARCH_DEPT_LIST: `/deptInfoController/searchConstrDeptAuditList`,//查询科室信息审核列表
  SEARCH_FORMULA_DETAILS: `/formulaController/selectAllYearFornla`,//医院机构质量指标详情
  UPDATE_FORMULA_DETAILS: `/formulaDetailController/updateFormulaDetail`,//质量上报新增/暂存
  //登录
  USERLOGIN :`/login/userLogin`,//查询用户列表
  USERREGISTER :`/user/registerUserInfo`,//查询用户注册
  //注册
  //用户模块
  SEARCH_USER_LIST :`/user/findAllUserList`,//查询用户列表
  RESET_PASSWORD: `/user/resetUserPwd`,//重置密码
  ADDUPDATEUSER :`/user/addUpdateUser`,//查询用户注册
  AUDITUSERINFO :`/user/auditUserInfo`,//用户管理-注册用户审核
  
  //机构
  SEARCH_ORGS: `/orgController/findOrgs`,//查询机构
  SEARCH_ORGS_LIST: `/orgController/findAllOrgList`, //查询所有机构
  ADD_ORG: `/orgController/addUpdateOrgInfo`,//新增更新机构

  //获取省市区级联菜单
  CITY: `/js/City.json`,

  //HOME页面相关
  ORG_INFO: `/deptInfoController/getOrgInfoTb`,
  ORG_GENDER: `/deptInfoController/getOrgDeptInfoByGender`, //医工人数
  ORG_EDUCATION: `/deptInfoController/getOrgEducation`,//学历
  ORG_ADVERSE: `/deptInfoController/getAdverseEvents`,//不良事件
  ORG_TRACE: `/deptInfoController/getMaterialTraceability`,//耗材追溯
  ORG_LEVEL: `/deptInfoController/getOrgAllLevel`//机构分布
}