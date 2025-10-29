import { useState } from "react";
import { Brain, Clock, Trophy, ArrowRight, CheckCircle2, XCircle, Award } from "lucide-react";
import { Quiz } from "../types/blog";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface QuizPageProps {
  quizzes: Quiz[];
  onQuizSelect?: (quizId: string) => void;
}

export function QuizPage({ quizzes, onQuizSelect }: QuizPageProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizStart = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz) return;
    
    let totalScore = 0;
    selectedQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore += question.points;
      }
    });
    
    setScore(totalScore);
    setShowResults(true);
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "hard":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Quiz List View
  if (!selectedQuiz) {
    return (
      <div className="pb-16">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-8 w-8" />
            <h1 className="text-white">Writing Quizzes</h1>
          </div>
          <p className="text-sm text-purple-100">
            Test your writing knowledge and skills
          </p>
        </div>

        {/* Quiz Cards */}
        <div className="p-4 space-y-4">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleQuizStart(quiz)}
            >
              {quiz.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={quiz.image}
                    alt={quiz.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3>{quiz.title}</h3>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {quiz.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    <span>{quiz.questions.length} questions</span>
                  </div>
                  {quiz.timeLimit && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.timeLimit} min</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>{quiz.totalPoints} pts</span>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  Start Quiz
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Results View
  if (showResults) {
    const percentage = (score / selectedQuiz.totalPoints) * 100;
    const passed = percentage >= 70;

    return (
      <div className="pb-16">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6">
          <h1 className="text-white mb-2">Quiz Results</h1>
          <p className="text-sm text-purple-100">{selectedQuiz.title}</p>
        </div>

        {/* Results Summary */}
        <div className="p-4">
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                passed 
                  ? "bg-green-100 dark:bg-green-900" 
                  : "bg-orange-100 dark:bg-orange-900"
              }`}>
                <Award className={`h-10 w-10 ${
                  passed 
                    ? "text-green-600 dark:text-green-300" 
                    : "text-orange-600 dark:text-orange-300"
                }`} />
              </div>
              
              <h2 className="mb-2">{passed ? "Congratulations!" : "Good Try!"}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {passed 
                  ? "You've passed the quiz!"
                  : "Keep learning and try again!"}
              </p>

              <div className="text-4xl mb-2">
                {score} / {selectedQuiz.totalPoints}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {percentage.toFixed(0)}% Score
              </p>

              <Progress value={percentage} className="mb-4" />

              <div className="grid grid-cols-3 gap-4 text-center mt-6">
                <div>
                  <div className="text-2xl mb-1">
                    {selectedAnswers.filter((ans, idx) => 
                      ans === selectedQuiz.questions[idx].correctAnswer
                    ).length}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Correct</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">
                    {selectedAnswers.filter((ans, idx) => 
                      ans !== selectedQuiz.questions[idx].correctAnswer
                    ).length}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Wrong</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">{selectedQuiz.questions.length}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answer Review */}
          <div className="space-y-4 mb-6">
            <h3 className="mb-4">Review Answers</h3>
            {selectedQuiz.questions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <Card key={question.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2 mb-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="mb-3">
                          {index + 1}. {question.question}
                        </h4>
                        
                        <div className="space-y-2 mb-3">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = selectedAnswers[index] === optionIndex;
                            const isCorrectAnswer = question.correctAnswer === optionIndex;
                            
                            return (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrectAnswer
                                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                    : isUserAnswer
                                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">{option}</span>
                                  {isCorrectAnswer && (
                                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {question.explanation && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                            <p className="text-sm text-blue-900 dark:text-blue-300">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleRetake} className="w-full">
              Retake Quiz
            </Button>
            <Button onClick={handleBackToQuizzes} variant="outline" className="w-full">
              Back to Quizzes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Question View
  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">{selectedQuiz.title}</h2>
          <Button
            onClick={handleBackToQuizzes}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            Exit
          </Button>
        </div>
        
        <div className="flex items-center justify-between text-sm text-purple-100 mb-2">
          <span>Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</span>
          <span>{currentQuestion.points} points</span>
        </div>
        
        <Progress value={progress} className="bg-purple-400" />
      </div>

      {/* Question */}
      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="mb-6">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
          className="w-full"
        >
          {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
            <>
              Next Question
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              See Results
              <Trophy className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
