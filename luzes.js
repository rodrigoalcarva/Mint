$(document).ready(function() {

    /* Luzes */

    $(".cores").click(function() {
      $(".cores").css("background-color", "#368787");
      $(this).css("background-color", "rgba(237, 193, 61, 0.8)");
      $(".intensidade").click(function() {
        $(".intensidade").css("background-color", "#368787");
        $(this).css("background-color", "rgba(237, 193, 61, 0.8)");
        $("#concluir").show();
      });
    });


    $("#ok").click(function() {
      location.href = "inicio.html"
    });



    /* Televisão */

    $(".canal").click(function() {
      $(".canal").css("background-color", "#3C9090");
      $(this).css("background-color", "rgba(237, 193, 61, 0.8)");
      $("#concluirtv").show();
    });

    $("#oktv").click(function() {
      $("#concluirtv").hide();
    });

    /* Música */

    $("#musicas").delegate('tr', 'click', function() {
        $("tr:nth-child(even)").css("background-color", "#3C9090");
        $("tr:nth-child(odd)").css("background-color", "#5C6F6F");
        $(this).css("background-color", "rgba(237, 193, 61, 0.8)");
        $("#concluirMusica").show();
    });
    $("#okMusica").click(function() {
      $("#concluirMusica").hide();
    });
});
