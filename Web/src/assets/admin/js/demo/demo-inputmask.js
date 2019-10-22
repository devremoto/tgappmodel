jQuery(function($){
    $.mask.definitions['~']='[+-]';
      $('#masked-date').mask('99/99/9999',{placeholder:"mm/dd/yyyy"});
      $('#masked-phone').mask('(999) 999-9999');
      $('#masked-datetime').mask("99/99/9999 99:99:99");
      $("#masked-tin").mask("99-9999999");
      $("#masked-ssn").mask("999-99-9999");
      $("#masked-product").mask("a*-999-a999",
            {placeholder:" ",completed:function(){
                swal({
                    title: "Correct product code!",
                    text: "You typed the following product code: "+this.val(),
                    confirmButtonText: "Cool!"
                });
            }});
});
