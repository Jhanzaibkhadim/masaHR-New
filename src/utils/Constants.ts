export class Constants {

    static BASE_URL = 'https://bsosys.com/api/';

    static LOGIN = 'login'

    // for basicinfo / profile

    static GET_BASIC_INFO = 'profile_read/'

    static SAVE_USER_INFO_KEY = 'save_info'

    static GET_DEPARTMENTS = 'departments/'

    static GET_JOBS = 'jobs/'

    static UPDATE_PROFILE = 'profile_update'

    // for banks

    // static GET_BANK_LIST = 'bank_list?employee_id='
    // /api/bank_info/employee_id/partner_bank_id
    static GET_BANK_LIST = 'bank_list/'
    
    static GET_BANK_INFO='bank_info?partner_bank_id='

    static READ_BANKS = 'banks/'

    static CREATE_BANK = 'bank_insert'

    static GET_PARTNER_ID = 'get_partner_id'

    static UPDATE_BANK = 'bank_update'

    // Employee Skill List

    static LOST_EMPLOYEE_SKILL_LIST = 'lskill_list'

    static CURRENT_EMPLOYEE_SKILL_LIST = 'cskill_list'

    // Employee Qualification read , update 

    static EMPLOYEE_QUALIFICATION_LIST = 'qualification_list'

    static EMPLOYEE_QUALIFICATION_INFO = 'qualification_info1&qualification_id=3'

    static UPDATE_EMPLOYEE_QUALIFICATION = 'qualification_update'

    static INSERT_EMPLOYEE_QUALIFICATION = 'qualification_insert'

    static READ_DEGREES_LIST = 'degrees/'

    static READ_SPECIALIST_LIST = 'specialists/'

    static READ_JOB_CATEGORY_LIST = 'job_category/'


    // ?Employee  Experience 

    static GET_EXPERIENCE = 'experience_list'

    static GET_EXP_INFO = 'experience_info/?experience_id='

    static CREATE_EXPERIENCE = 'experience_insert'

    static UPDATE_EXP = 'experience_update'

    static GET_EMP_DETAIL = "employee_job"


    static INSERT_ATTENDECE = "insert_attendance"

    static TODAY_ATTENDANCE = 'attendance_today'

    static ATTENDANCE_STATUS = 'attendance_status'

    static CONTRACT_ID = 'employee_contract'

    static GET_ATTENDANCE_CONFIG = 'attendance_config'


}
