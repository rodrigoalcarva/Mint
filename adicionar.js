var soma = 0;
var itemNum = 0;
var n;

$(document).ready(function() {
  $("#escolha > div").click(function() {
      var imageSrc = $(this).find('img').attr('src');
      var name =  $(this).find('.nome').html();
      var price =  $(this).find('.preco').html();

      n =  "." + name.replace(/ /g, "");
      console.log(n);
      $(n).show();

      var p = "<div class=nome> " + name + "</div> <div class=preco>" + price + "</div> <img src= " + imageSrc + " />"
      $("#maisContent > div:first-child").html(p);

      $("#mais").show();
    });


  $("#cancel").click(function() {
    $(n).hide();
    $("#mais").hide();
  });


  $("#recomendados > div").click(function() {

    var imageSrc = $(this).find('img').attr('src');
    var namePrice =  $(this).find("div").html().split("-");

    var p = "<div class=nome> " + namePrice[0] + "</div> <div class=preco>" + namePrice[1] + "</div> <img src= " + imageSrc + " />"
    $("#maisContent > div:first-child").html(p);

    var name = namePrice[0];
    n =  "." + name.replace(/ /g, "");

    $(n).show();

    $("#mais").show();
  })


  $("#add").click(function() {
    var imageSrc = $("#maisContent > div:first-child img").attr('src');
    var name =  $("#maisContent .nome").html();
    var price =  $("#maisContent .preco").html();

    $(n).hide();

    if (sessionStorage.length != 0 && !(sessionStorage.length == 1 && sessionStorage.getItem("final") != null)) {
      var k = [];

      for (var key in sessionStorage){
        if (key != "final") {
          k.push(parseInt(key));
        }
      }

      var max = k.reduce(function(a, b) {
        return Math.max(a, b);
      });

      itemNum = max + 1;
    }
    else {
      itemNum = 0;
    }

    soma += Number(price.replace('€',' '));

    sessionStorage.setItem(itemNum, [name, imageSrc, price]);
    itemNum += 1;

    var p = "<div class = prato> <img src = " + imageSrc + " /> <img src=imagens/cancelar.png /> <h5> " + price + " </h5> <img src = imagens/info.png /> </div>";
    $("#pedido > div:first-child").append(p);

    $("#pedido > div:last-child h2").html("Total: <br>" + soma + "€");

    $("#pagamento").show();
    $("#pedido > div:last-child h2").css("display", "inline");

    $("#mais").hide();

    $(".prato > img:nth-child(2)").click(function() {
      var pai = $(this).parent()[0];
      image = $(pai).find("img")[0];
      image = $(image).attr("src");
      var preco = $(pai).find("h5").html();

      for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        var value = sessionStorage[key];

        if (value.includes(image)) {
          sessionStorage.removeItem(key);
        }
      }

      if (sessionStorage.length == 0) {
        $("#pagamento").hide();
        $("#pedido > div:last-child h2").css("display", "none");
      }

      $(this).parent()[0].remove();

      soma -= Number(preco.replace('€',' '));

      $("#pedido > div:last-child h2").html("Total: <br>" + soma + "€");
    });
  });


  $(".prato").ready(function() {
    $(".prato > img:nth-child(2)").click(function() {
      var pai = $(this).parent()[0];
      image = $(pai).find("img")[0];
      image = $(image).attr("src");
      var preco = $(pai).find("h5").html();

      for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        var value = sessionStorage[key];

        if (value.includes(image)) {
          sessionStorage.removeItem(key);
        }
      }

      if (sessionStorage.length == 0) {
        $("#pagamento").hide();
        $("#pedido > div:last-child h2").css("display", "none");
      }

      $(this).parent()[0].remove();

      console.log(preco.substring(0, preco.length));
      soma -= Number(preco.replace('€',' '));

      $("#pedido > div:last-child h2").html("Total: <br>" + soma + "€");
    });
  });

  if (sessionStorage.length != 0) {
    $("#pagamento").show()
    $("#pedido > div:last-child h2").css("display", "inline")

    for (var i = 0; i < sessionStorage.length; i++) {

      if (sessionStorage.key(i) != "final") {
        el = sessionStorage.getItem(sessionStorage.key(i)).split(",");

        var p = "<div class = prato> <img src = " + el[1] + " /> <img src=imagens/cancelar.png /> <h5> " + el[2] + " </h5> <img src = imagens/info.png /> </div>";
        $("#pedido > div:first-child").append(p);

        soma += Number(el[2].replace('€',' '));
      }
    }
    $("#pedido > div:last-child h2").html("Total: <br>" + soma + "€")
  }

});
