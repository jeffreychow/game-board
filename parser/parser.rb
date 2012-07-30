#!/usr/bin/env ruby

begin
  
inputFile = File.new("input.txt", "r")
outputFile = File.new("output.txt","w")
$inQuestion = false
$question = ""
$answerText = []
$answer = -1
$hasAnswer = false
$answerCounter = 0

while (line = inputFile.gets)
  next if line.start_with?('#')
    
  line = line.gsub("\n","")
  if $inQuestion
    if line.empty?  # done with question
      puts "done with #{$question}"
      #question
      outputFile.puts "question: '" + $question + "',"
      #answerText
      outputFile.puts "answerText: [" + $answerText.map{|ans| "'#{ans}'"}.join(',') + "],"
      #answer
      outputFile.puts "answer: " + $answer.to_s()
      outputFile.puts "\n"
      $inQuestion = false
      $answerText = []
      $answer = -1
      $hasAnswer = false
    else
      if line.match(/\*$/)
        # TODO: throw exception if already has answer!
        $answer = $answerCounter
        $hasAnswer = true
        puts "Answer #{$answer}"
      end
      $answerText.push(line.gsub("*",""))
      $answerCounter += 1
      puts "Adding choice #{$answerText.last} #{$answerCounter}"
    end
  else
    if line.start_with?("Q: ")
      $inQuestion = true
      $question = line.gsub("Q: ","")
      $answerCounter = 0
      puts "Parsing question #{$question}"
    end
  end      
end

rescue
  puts "ERROR"
  
ensure
inputFile.close
outputFile.close
end