import {HttpErrorResponse} from '@angular/common/http'

export class ErrorHandler{
  handlerError(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.error('client side Error:'+ errorResponse.error.message);
      console.error('server side error:'+errorResponse);

    }
    else{
      return alert('please refresh the website,may there problem with user')
    }
  }

}
