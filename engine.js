$(function() {
  
  var _initGameData = window.initGameData,
      _topics = _initGameData.topics,
      teamTemplate = '<li id="${team}-score"><div><span class="team-name">${team}</span><span class="score">${score}</span></div></li>',
      topicTemplate = '<th><h2>${topic}</h2></th>',
      questionTemplate = '<td><div class="value">$${amount}</div><div class="question"><div class="question-text">${question}</div><ol>{{each answerText}}<li class="{{if $index==answer}}answer{{/if}}">${$value}</li>{{/each}}</ol></div></td>';
      
      
  // use initGameData to initialize game
  if(_initGameData.teams && _initGameData.teams.length >1) {
    var teams = _initGameData.teams;
    for(var i=0,len=teams.length;i<len;i++) {
      $.tmpl(teamTemplate,{team: teams[i],score:0}).appendTo('#score-board ul');  // initialize score per team
    }
    $('#score-board ul li:first-child').addClass('selected');
  } else {
    throw "Need at least two teams";
  }
  
  if(_topics.length>0) {
    _renderQuestions(_topics); 
  } else {
    throw "No topics!";
  }
  
  // hook up question click event
  $('#game-board td').live('click',function() {
    $this = $(this);
    $('#question-modal .question-container').html($this.html());
    $this.fadeOut('slow',function(){
      $this.css('display','');
      $this.css('visibility','hidden');
      $('#game-board').addClass('hide');
      $('#question-modal').addClass("show");
      });
  });
  
  // hook up answer click event
  $('#question-modal li').live('click', function() {
    var $this = $(this),
        $parent = $this.parent();
    if($parent.hasClass('answered')) {
      return;
    }
    if($this.hasClass('answer')) {
      var questionScore = ($('#question-modal .value').text().substring(1) * 1), //hack
          $scoreContainer = $('#score-board .selected .score'),
          origScore = ($scoreContainer.text() * 1);
      $scoreContainer.text(origScore+questionScore);
      $parent.addClass('correct'); 
    } else {
      $parent.addClass('wrong');
    }
    $parent.addClass('answered');
  });
  
  $('#question-modal .close').on('click',function() {
    $(this).parent().removeClass('show');
    $('#game-board').removeClass('hide');
  });
  
  // hook up team selection
  $('#score-board li').on('click',function() {
    var $this = $(this);
    $('#score-board li').removeClass('selected');
    $(this).addClass('selected');
  });

/********************
** Utility Functions
*******/

  // assume well formed topics for now (4x4 game board)
  function _renderQuestions(topics) {
    var gameBoard = $('#game-board'),
        firstRow = $('<tr></tr>').appendTo(gameBoard),
        ROW_NUM = 4;
    // heading row
    for(var i=0,len=_topics.length;i<len;i++) {
      $.tmpl(topicTemplate,{topic: topics[i].title}).appendTo(firstRow);
    }
    
    for(var i=0,len=ROW_NUM;i<len;i++) {  // for each row
      var row = $('<tr></tr>').appendTo(gameBoard)
      for(var j=0,len=_topics.length;j<len;j++) { // loop through the topics and get question
        $.tmpl(questionTemplate,topics[j].questions[i]).appendTo(row);
      }
    }
  }
  
  
});