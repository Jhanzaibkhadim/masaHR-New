export class Constants {

    static BASE_URL = 'http://www.masa-hr.info/api/';

    static LOGIN = 'login'

    // for basicinfo / profile

    static GET_BASIC_INFO = 'profile_read?employee_id='

    static SAVE_USER_INFO_KEY = 'save_info'

    static GET_DEPARTMENTS = 'departments'

    static GET_JOBS = 'jobs/'

    static UPDATE_PROFILE = 'profile_update'

    // for banks

    // static GET_BANK_LIST = 'bank_list?employee_id='
    // /api/bank_info/employee_id/partner_bank_id
    static GET_BANK_LIST = 'bank_info/'


    static READ_BANKS = 'banks'

    static CREATE_BANK = 'bank_insert'

    static GET_PARTNER_ID = 'get_partner_id?employee_id='

    static UPDATE_BANK = 'bank_update'

    // Employee Skill List

    static LOST_EMPLOYEE_SKILL_LIST = 'lskill_list?employee_id='

    static CURRENT_EMPLOYEE_SKILL_LIST = 'cskill_list?employee_id='

    // Employee Qualification read , update 

    static EMPLOYEE_QUALIFICATION_LIST = 'qualification_list?employee_id='

    static EMPLOYEE_QUALIFICATION_INFO = 'qualification_info?employee_id=1&qualification_id=3'

    static UPDATE_EMPLOYEE_QUALIFICATION = 'qualification_update'

    static INSERT_EMPLOYEE_QUALIFICATION = 'qualification_insert'

    static READ_DEGREES_LIST = 'degrees/'

    static READ_SPECIALIST_LIST = 'specialists/'

    static READ_JOB_CATEGORY_LIST = 'job_category/'


    // ?Employee  Experience 

    static GET_EXPERIENCE = 'experience_list/employee_id='


    static CREATE_EXPERIENCE = 'experience_insert'

    static GET_EMP_DETAIL = "employee_job?employee_id="



}
