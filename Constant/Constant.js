const CONSTANTS = {
  REGEX: {
      EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      NUMBER:/^\d+$/,
      PHONE: /^[0-9]{10,13}$/,
      PHONE_INDIAN: /^\+91[0-9]{10}$/,
      COUNTRY_CODE: /^(\+?\d{1,3}|\d{1,4})$/,
      FILE_TYPE: /^[A-Za-z]+(,[A-Za-z]+)*$/,
      NAME:/^[a-zA-Z0-9 ._/&@-]+$/,
      PERSON_NAME:/^[a-zA-Z .]+$/,
      TEST_LISTS: /^(?:(?:[a-zA-Z0-9&\-_/\"'() ]+),)*(?:[a-zA-Z0-9&\-_/\"'() ]+)$/,
      PINCODE:  /^[1-9][0-9]{5}$/,
  },

 
  SUPERADMIN : 1,
  ADMIN : 2,
  USER  : 3,


  KEY_TYPE: {
    EMAIL: 0,
    PHONE: 1
  },

 
  GENDER: {
      MALE: 1,
      FEMALE: 2,
      OTHER: 3
  },
  USER_ROLES:{
    SUPERADMIN: 1,
    ADMIN: 2,
    USER : 3
  },
  
  FILE_SIZE:{
    MIN:10,
    MAX:204800,
  },

  
  STATUS: {
    ACTIVE: 1,
    INACTIVE: 0
  },
  MODULE_TYPE : {
    ADMIN: 1,
    GENERAL: 2,
  },

  ADMIN_TYPE: {
      SUPERADMIN: 1,
      ADMIN: 2,
      APPROVER: 2,
      FINANCE: 3
  },

  
  PRIVILEGE : {
    PROGRAMME : {
      ADMIN : {
        // DESIGNATION : { id:1 , value:"Designation Master"},
        PRIVILEGES : { id:2 , value:"Privileges Master"},
        ADMIN : { id:3 , value:"Admin Master"},
        USER : { id:4 , value:"Users Master"},
        // VENDOR : { id:5 , value:"Vendor Master"},
        CATEGORY : { id:6 , value:"Category Master"},
        EVENT : { id:7 , value:"Event Master"},
        AUDIT_LOGS : { id:30 , value:"Audit Logs"},
        LOGIN_LOGS : { id:31 , value:"Login History"},
      },
  }},

  DESIGNATIONS : {
    1: { internal_id: 1, name: "MANAGER",  value: "Manager" },
    2: { internal_id: 2, name: "MANAGEMENT", value: "Management" },
    3: { internal_id: 3, name: "VERIFIER", value: "Verifier" },
    4: { internal_id: 4, name: "FINANCE",  value: "Finance" },
  },

  
  // PASSWORD_VALIDATION_REGEX: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"),
  PASSWORD_VALIDATION_REGEX: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#_])[A-Za-z\\d@$!%*?&#_]{8,}$"),

  VERIFIER_ID:"667d424bfb991cc88c45409f",
  MANAGER_ID:"667d427dfb991cc88c4540c5",
  FINANCER_ID:"667d4261fb991cc88c4540b2",

  DEFAULT_PASSWORD: "OPDSURE2024"

}

module.exports = CONSTANTS