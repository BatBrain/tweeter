/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let tweets = $.get("/tweets");

function renderTweets(tweets) {
	// console.log(tweets.map(x => `<div>${x.content.text}</div>`));
	$('#tweet-container').html(tweets.map(createTweetElement));
};

function annoyingAlert() {
  $('.container').on('click', 'article.tweet', function(ev) {
    ev.preventDefault();
    alert('Tweet, Tweet!');
  });
}

function createTweetElement(tweet) {
  // var $tweet = $('<article>').addClass('tweet');
	return `
		<article class="tweet">
			<header class="tweet-header">
				<div>
				<img class="profile-avatar" src="${tweet.user.avatars.small}">
				<strong class="fullname">${tweet.user.name}</strong>
        	<span>
						${tweet.user.handle}
        	</span>
        </div>
      </header>
      <div class="tweet-text">
       		${tweet.content.text}
      </div>
      <footer class="tweet-footer">
        	<span>${tweet.created_at}</spam>
      </footer>
		</article>
	`
};

function composeButton() {
  $('div.create-tweet-button').hover(() => {
    console.log($('div.create-tweet-button').children())
    $('div.create-tweet-button').children().css("color", "#00a087")
  }, () => {
    console.log('leave')
    $('div.create-tweet-button').children().css("color", "black")
  })
  $('div.create-tweet-button').click(function() {
    $('section.new-tweet').toggle('500', function() {
    if ($('section.new-tweet').is(':visible')) {
      $('section.new-tweet textarea').focus()
    }
    });
  });
};

$(function() {
  let $form = $('#new-tweet-form');
  $form.submit( (ev) => {
    ev.preventDefault();
    let text = `${$('#new-tweet-text').val()}`
    if (text.length < 1 || text === null) {
      return alert("You heven't entered anything to send!");
    }
    if (text.length > 140) {
      return alert("Thats too long!");
    }
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: $form.serialize()
    })
    .then((response) => {
        $('#new-tweet-text').val('');
    })
    .then(() => $.get("/tweets").then(renderTweets))
  });
  composeButton();
  tweets.then(renderTweets);
  annoyingAlert();
});