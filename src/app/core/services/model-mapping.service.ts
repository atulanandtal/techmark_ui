import {LoggerService} from './logger.service';

export class ModelMappingService {
  private uiToApiMapObj = {};
  private logger : LoggerService = new LoggerService();
  constructor(private apiToUiMapObj:Object){
    this.constructUI2ApiMapping(this.apiToUiMapObj, this.uiToApiMapObj);
  }

  constructUI2ApiMapping(apiMapObj, uiMapObj){
    Object.keys(apiMapObj).forEach(key => {
      if(typeof apiMapObj[key] === "string"){
        uiMapObj[apiMapObj[key]] = key;
      }
      else if(apiMapObj[key] instanceof Object && !(apiMapObj[key] instanceof Array)){
        let mappedKey = apiMapObj[key]['mappedName'];
        uiMapObj[mappedKey] = {
          mappedName : key
        };
        //delete apiMapObj[key]['mappedName'];
        this.constructUI2ApiMapping(apiMapObj[key], uiMapObj[mappedKey]);
      }
    });
  }

  getApiData(data){
    var convertedData;
    if(data instanceof Object && !(data instanceof Array)){
      convertedData = this.getMappedDataObj(data, this.uiToApiMapObj);
    }
    else if(data instanceof Object && data instanceof Array){
      convertedData = [];
      data.forEach(obj => {
        convertedData.push(this.getMappedDataObj(obj, this.uiToApiMapObj));
      })
    }
    return convertedData;
  }

  getUIData(data){
    var convertedData;
    if(data instanceof Object && !(data instanceof Array)){
      convertedData = this.getMappedDataObj(data, this.apiToUiMapObj);
    }
    else if(data instanceof Object && data instanceof Array){
      convertedData = [];
      data.forEach(obj => {
        convertedData.push(this.getMappedDataObj(obj, this.apiToUiMapObj));
      })
    }
    return convertedData;
  }

  private getMappedDataObj(objData, modelMapObj){
    Object.keys(objData).forEach(key => {
      try {
        if (!modelMapObj[key]) {
          return;
        }
        if (objData[key] instanceof Object && !(objData[key] instanceof Array)) {
          let apiKey = modelMapObj[key]['mappedName'] || modelMapObj[key];
          objData[apiKey] = objData[key];
          this.getMappedDataObj(objData[apiKey], modelMapObj[key]);
          if (apiKey != key) {
            delete  objData[key];
          }
        }
        else if (objData[key] instanceof Object && objData[key] instanceof Array) {
          let apiKey = modelMapObj[key]['mappedName'] || modelMapObj[key];
          objData[apiKey] = objData[key];
          if (objData[apiKey] && typeof objData[apiKey][0] == 'object') {
            objData[apiKey].forEach(obj => {
              this.getMappedDataObj(obj, modelMapObj[key]);
            });
          }
          if (apiKey != key) {
            delete  objData[key];
          }
        }
        else {
          //(typeof objData[key] === "string" || typeof objData[key] === "number" || typeof objData[key] === "boolean")
          let apiKey = modelMapObj[key] || key;
          if (apiKey != key) {
            objData[apiKey] = objData[key];
            delete objData[key];
          }
        }
      }
      catch(err){
        this.logger.error("Error in model mapping service. Error : ", err);
      }
    });
    return objData;
  }

  //private validationObj(){
  //  return {
  //    isDataValid : (data) => {
  //      return (!data || data == "" || data == undefined) ? false : true;
  //    }
  //  }
  //}
}
