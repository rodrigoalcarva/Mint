$(document).ready(function() {
  var np = 0;

  $("#pagamento").click(function() {
    var soma = $("#pedido > div:last-child h2").html().substring(11);
    $("#pagamentoContent > div:first-child > div:first-child > div:last-child").html("Total: " + soma);

    $("#pagamentoEcra").show();

    for (var i = np; i < sessionStorage.length; i++) {

      if (sessionStorage.key(i) != "final") {
        el = sessionStorage.getItem(sessionStorage.key(i)).split(",");

        np += 1;
        $("#pratos").append( el[0] + "<br>");
      }
    }
  });

  $("input[value=encomenda]").click(function () {
    $("#marc").show();
  });

  $("input[value=restaurante]").click(function () {
    $("#marc").hide();
  });

  $("input[name=morada], input[name=hora]").click(function () {
    $("#teclado").show();
    setTimeout(function () {
      $("#teclado").hide();
    },  5000);
  });

  $("input[name=local]").click(function() {
    if ($("input[name=pagamento]").is(':checked')) {
      $("#finalizar").removeAttr('disabled');
      $("#finalizar").css("background-color", "green");
    }
  });

  $("input[name=pagamento]").click(function() {
    if ($("input[name=local]").is(':checked')) {
      $("#finalizar").removeAttr('disabled');
      $("#finalizar").css("background-color", "green");
    }
  });

  $("#finalizar").click(function() {
    var final = [];

    for (var i = 0; i < sessionStorage.length; i++) {

      if (sessionStorage.key(i) != "final") {
        el = sessionStorage.getItem(sessionStorage.key(i));
        el = el.substring(1,el.length - 1);
        el = el.replace(/,/g,'//');
        final.push(el);
      }
    }

    for (var i = sessionStorage.length; i >= 0; i--) {
      if (sessionStorage.key(i) != "final") {
        sessionStorage.removeItem(sessionStorage.key(i));
      }
    }

    $("#pagamentoEcra").hide();
    $(".prato").remove();

    var pfinal = sessionStorage.getItem("final");

    if (pfinal != null) {
      pfinal = pfinal.split(",");
      for (var i = 0; i < pfinal.length; i++) {
        final.push(pfinal[i]);
      }
    }

    sessionStorage.setItem("final", final);
    window.location.replace("inicio.html");
    localStorage.setItem("pagamentoCon", "nao");
  });

  $("#cancelarPagamento").click(function() {
    $("#pagamentoEcra").hide();
  });

  var current = window.location.href.split("/");
  current = current[current.length - 1];
  current = current.substring(0, current.length - 5);



  if (current == "inicio" && sessionStorage.length != 0) {
    var f = sessionStorage.getItem("final").split(",");
    var price = 0;
    for (var i = 0; i < f.length; i++) {

      el = f[i].split("//");

      price += parseInt(el[2])
      var p = "<div class = final> <div class = nome>" + el[0] + "</div> <img class=c src = " + el[1] + " /> <div> Tempo: 28:00 <div class = maisInf> Mais </div> <div class = r> Cancelar </div> </div>";
      $("#PrincipalInicio > div:first-child > div:last-child").append(p);
    }
    $("#pedidoHeader > button").after("<h2>" + price +  " € </h2>");

    if (localStorage.getItem("pagamentoCon") == "sim") {
      $("#pagamentoFinal").attr("disabled", true);
      $("#pagamentoFinal").css("background-color", "#c7ead8");
    }

    $("input[name=tipoPagamento]").click(function() {
        $("#pagar").removeAttr('disabled');
        $("#pagar").css("background-color", "green");
    });
  }



  $(".final").ready(function() {
    $(".maisInf").click(function() {
      $("#maisFinalEcra").show();
      var pai = $(this).parent()[0];
      pai = $(pai).parent()[0]
      var nome = $(pai).find("div:first-child")[0];
      $("#pratos").html($(nome).html());
    });

    $("#pagamentoFinal").click(function() {
      $("#pagamentoFinalEcra").show();
      if ($("#pagamentoFinalContent > div:first-child > div:first-child > div:first-child").html().length == 1) {
        var f = sessionStorage.getItem("final").split(",");
        var price = 0;
        for (var i = 0; i < f.length; i++) {

          el = f[i].split("//");

          price += parseInt(el[2])
          $("#pagamentoFinalContent > div:first-child > div:first-child > div:first-child").append(el[0] + "<br>");
        }
        $("#pagamentoFinalContent > div:first-child > div:first-child > div:last-child > h2").append(price +  "€");
      }
    });

    $(".r").click(function() {
      var pai = $(this).parent()[0];
      pai = $(pai).parent()[0]
      pai.remove();
      var filho = $(pai).find("div:first-child")[0];
      filho = $(filho).html();

      var f = sessionStorage.getItem("final").split(",");

      for (var i = 0; i < f.length; i++) {
        var el = f[i].split("//")[0];
        if (el == filho) {
          f.splice(i, 1);
        }
        sessionStorage.setItem("final", f);
      }

      var filho = [];
      for (var i = 0; i < $("#PrincipalInicio > div:first-child > div:last-child").children().length; i++) {
        filho.push($("#PrincipalInicio > div:first-child > div:last-child").children()[i]);
      }
      if (filho.length === 0) {
        sessionStorage.removeItem("final");
        $("#pagamentoFinal").hide();
        $("#pedidoHeader > h2:last-child").hide();
      }

    });
  });

  //Botoes do menu de lado

 var pai;

 $(".b").click(function() {
   pai = $(this).parent()[0];
   if (sessionStorage.length !== 0 && sessionStorage.getItem("final") == null || sessionStorage.length > 1) {
     $("#cancelar").show();
     $(pai).click(function() {return false;});
   }
 });


 $("#N").click(function() {
   $("#cancelar").hide();
 });

 $("#S").click(function() {
   var s = $(pai).attr("href");
   window.location.replace(s);
   $("#cancelar").hide();

   for (var i = sessionStorage.length; i >= 0; i--) {
     if (sessionStorage.key(i) != "final") {
       sessionStorage.removeItem(sessionStorage.key(i));
     }
   }
 });

 if (current == "inicio" && sessionStorage.getItem("final") != null) {
   $("#pagamentoFinal").show();
 }

 if (current == "refeicoes") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }

 if (current == "refeicoes") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "tipoReservas") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "resCasual") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "resFam") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "resNeg") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "resParty") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "resRom") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "descontos") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:first-child > a:nth-child(3) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "entretenimento") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child >a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "filmes") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child >a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "jogos") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child >a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "jogoMem") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child >a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "jogoPing") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child >a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "jogoTetris") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child >a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "jogoSnake") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child >a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "jornais") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child >a:first-child div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "ambiente") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "music") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "luzes") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }
 else if (current == "televisao") {
   $("#Principal > div:not(#escolha) div").css("background-color", "#6C9E9F");
   $("#Principal > div:last-child > a:nth-child(2) div").css("box-shadow", "inset 0 0 40px darkblue");
 }

 $("#Principal > div:last-child > div:last-child").click(function() {
   var t = this;

   $(this).css("box-shadow", "inset 0 0 40px darkblue");

   setTimeout(function () {
     $(t).css("box-shadow", "none");
   },  5000);
 });

 $("#cancelarGuardar").click(function() {
   $("#maisFinalEcra").hide();
 });

 $("#guardar").click(function() {
   $("#maisFinalEcra").hide();
 });

 $("#cancelarPagar").click(function() {
   $("#pagamentoFinalEcra").hide();
 });

 $("#pagar").click(function() {
   $("#pagamentoFinal").attr("disabled", true);
   $("#pagamentoFinal").css("background-color", "#c7ead8");
   localStorage.setItem("pagamentoCon", "sim");
   $("#pagamentoFinalEcra").hide();
 });

 $("#Principal > div:last-child > div").click(function() {
   $("#empregado").show();
 });

 $("#K").click(function() {
   $("#empregado").hide();
 });

});
