import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
  financialConfigAlertMsg = "On Configuration change, it will override previous configuration and may results to data loss. So do you want to continue ?";
  viewDateFormat = "MMM d, y";
  viewDateTimeFormat = "yyyy-MM-dd HH:mm:ss";
  inputDateFormat = "mm/dd/yyyy";
  
  headerMapping = {
    TRENDING: 'What\'s Trending Now !!!',
    ALL_SHARED: 'Shared With All !!!',
    MY_SHARED: 'Shared By Me !!!',
    MY_FAVOURITES: 'My Favourites !!!',
    ARCHIVE: 'Articles You Archived !!!'
  }

  formMessage = {
    saveError: 'Form invalid. Please fill required fields wherever needed',
    continueError: 'Please fill all required fields to continue',
    saveSuccess: 'Form saved successfully',
    continueSuccess: 'Form submitted successfully'
  };

  message = {
    fileTypeAllowedError : 'File(s) found with invalid extension : '
  }

  validationRegexMapping = {
    PHONE: /\d{3}-\d{3}-\d{4}/,
    FULL_DATE: /\d{2}\/\d{2}\/\d{4}/,
    MONTH_DATE: /\d{2}\/\d{4}/,
    YEAR_DATE: /\d{4}/,
    PHONE_ERROR_MSSG: 'Expected pattern is 111-222-3333',
    TAX_ID: '^\\d{2}-\\d{7}$',
    SSN_US: '^\\d{3}-\\d{2}-\\d{4}$',
    SIN_CANADA: '^\\d{3}-\\d{3}-\\d{3}$',
    ZIP_US: '^\\d{5}$',
    ZIP_CANADA: '^\\w{3} \\w{3}$',
    EMAIL: '(^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$)',
    EMAIL_ERROR_MSSG: 'Email format should be username@companyDomain',
    NUMBER: '^[\\d,]*$',
    NUMBER_ERROR_MSSG: 'Digits and comma only allowed',
    PERCENT: /^((?:|0|[1-9]\d?|100)(?:\.\d{1,3})?)\s%?$/,
    PERCENT_ERROR_MSSG: 'Percent should be between 0 and 100',
    FILE_NAME :'^[0-9a-zA-Z \.\_\-]*$'
  }

  imageTypeAllowed = ['ai', 'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'ps', 'psd', 'svg', 'tif', 'tiff'];

  documentTypeAllowed = ["ods", "xlr", "xls", "xlsx", "doc", "docx", "odt", "pdf", "rtf", "tex", "txt", "wks", "wps", "wpd", "ai", "bmp", "gif", "ico", "jpeg", "jpg", "png", "ps", "psd", "svg", "tif", "tiff", "key", "odp", "pps", "ppt", "pptx", "zip", "tar", "gz", "zipx", "7z"];

}
