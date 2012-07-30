$question = "question 1"
$answerText = ["ans1","ans2","ans3"]
$answer = 1
outputFile = File.new("output.txt","w")
  #question
  outputFile.puts "question: '" + $question + "',"
  #answerText
  outputFile.puts "answerText: [" + $answerText.map{|ans| "'#{ans}'"}.join(',') + "],"
  #answer
  outputFile.puts "answer: " + $answer.to_s()
  outputFile.puts "\n"
