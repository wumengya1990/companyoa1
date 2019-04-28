
export default{
     isNullorNull:function(value){
        if( value==null || value==undefined || value.toString().trim()==""){
            return true;
        }else{
            return false;
        }
    }
}