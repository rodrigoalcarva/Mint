$(function() {
  if ($('.select-options ul li').hasClass('selected')) {
    $('.select .input').text($('.select-options li.selected > span:first-child').text());
  } else {
    $('.select .input').text($('.select-options li:first-child > span:first-child').text());
  }
  $('.select').click(function() {
    $('.select-options').toggleClass('visible');
  });
  $('.select-options li').click(function() {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    $('.select .input').text($(this).find('span:first-child').text());
  });
})
