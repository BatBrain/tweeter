/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
	// console.log(tweets.map(x => `<div>${x.content.text}</div>`));
	tweets.forEach(tweet => {
  	$('#tweet-container').append(createTweetElement(tweet))
	});
};

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
}


$(function() {
  let $form = $('#new-tweet-form');
  $form.submit( (ev) => {
    ev.preventDefault();
    console.log('form  submitted, performing ajax call...');
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: $form.serialize(),
      success: (response) => {
        console.log('Success: ', response);
        $('new-tweet-text').replaceWith('');
      }
    });
  });
});

$("document").ready(function () {
	renderTweets(data)
});