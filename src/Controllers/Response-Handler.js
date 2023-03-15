const express = require('express');




class ResponseHandler {
  static res;
  constructor(res) {
    this.res = res;
  }


  testSend (value) {
    this.res.send({
      testMessage : value
    })
  }


}







module.exports = {
  ResponseHandler,
};
