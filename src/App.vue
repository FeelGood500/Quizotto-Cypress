<script setup>
import { ref, computed } from 'vue'
import language from './components/language.vue'
import reset from './components/reset.vue'
import footerA from './components/footerA.vue'
const questions = ref([
  {
    question: 'Jaka platforma jest najpopularniejsza na świecie do sprzedaży produktów online?',
    answer: 0,
    option: [
        'Amazon',
        'eBay',
        'Alibaba'
    ],
    selected: null
  },
  {
    question: 'Która metoda płatności jest powszechnie wykorzystywana w e-commerce?',
    answer: 0,
    option: [
        'Karta kredytowa',
        'Przelew bankowy',
        'PayPal'
    ],
    selected: null
  },
  {
    question: 'Co oznacza skrót SEO w kontekście biznesu online?',
    answer: 1,
    option: [
        'Social Engagement Optimization',
        'Search Engine Optimization',
        'Secure Encryption Online'
    ],
    selected: null
  },
  {
    question: 'Jak nazywa się strategia marketingowa polegająca na promowaniu produktów przez influencerów na platformach społecznościowych?',
    answer: 2,
    option: [
        'Content marketing',
        'Affiliate marketing',
        'Influencer marketing'
    ],
    selected: null
  },
  {
    question: 'Co to jest konwersja w kontekście e-commerce?',
    answer: 2,
    option: [
        'Przekształcenie strony internetowej w wersję mobilną',
        'Liczba odwiedzin strony internetowej',
        'Zamiana odwiedzających w klientów lub wykonanie pożądanej akcji'
    ],
    selected: null
  },
  {
    question: 'Który z poniższych modeli biznesowych polega na oferowaniu produktów lub usług za darmo, a dochód generowany jest z reklam?',
    answer: 2,
    option: [
        'Subskrypcja',
        'Freemium',
        'Reklama'
    ],
    selected: null
  },
  {
    question: 'Jak nazywa się proces polegający na optymalizacji strony internetowej w celu zwiększenia jej widoczności w wynikach wyszukiwania?',
    answer: 2,
    option: [
        'SEM (Search Engine Marketing)',
        'PPC (Pay-Per-Click)',
        'SEO (Search Engine Optimization)'
    ],
    selected: null
  },
  {
    question: 'Jaką platformę wykorzystuje się do tworzenia profesjonalnych stron internetowych?',
    answer: 0,
    option: [
        'WordPress',
        'Facebook',
        'Twitter'
    ],
    selected: null
  },
  {
    question: 'Jak nazywa się forma reklamy online, w której płacisz tylko za kliknięcie w reklamę?',
    answer: 1,
    option: [
        'CPM (Cost Per Thousand Impressions)',
        'CPC (Cost Per Click)',
        'CPA (Cost Per Action)'
    ],
    selected: null
  },
  {
    question: 'Która z poniższych platform jest popularna do tworzenia sklepów internetowych?',
    answer: 0,
    option: [
        'Shopify',
        'Pinterest',
        'LinkedIn'
    ],
    selected: null
  }
])


 const quizCompleted = ref(false)
 const currentQuestion = ref(0)
 const score = computed(() => {
  let value = 0
  questions.value.map(q => {
        if (q.selected == q.answer) {
          value++
        }
    })
    return value
 })

 const getCurrentQuestion = computed(() => {
    let question = questions.value[currentQuestion.value]
    question.index = currentQuestion.value
    return question
 })

 const SetAnswer = evt => {
      questions.value[currentQuestion.value].selected = evt.target.value
      evt.target.value = null
  }

  const NextQuestion = () => {
      if (currentQuestion.value < questions.value.length - 1) {
      currentQuestion.value++
  }      else {
    quizCompleted.value = true
  }
}  

const resetQuiz = () => {
      currentQuestion.value = 0
      quizCompleted.value = false
      questions.value.forEach(q => q.selected = null)
    }

</script>

<template>
  
  <div><language></language></div>
  <main class="app"> 
    <h1>Quizotto</h1>

    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question">{{ getCurrentQuestion.question }}</span>
        <span class="score">Wynik {{ score }}/{{ questions.length }}</span>
      </div>

      <div class="options">
        <label 
              v-for="(option, index) in getCurrentQuestion.option" 
              :key="index" 
              :class="`option ${ 
                getCurrentQuestion.selected == index 
                    ? index == getCurrentQuestion.answer 
                      ? 'correct' 
                      : 'wrong' 
                    : ''
              } ${
                 getCurrentQuestion.selected != null &&
                 index != getCurrentQuestion.selected
                      ? 'disabled'
                      : ''
              }`">
          <input 
                type="radio" 
                :name="getCurrentQuestion.index"
                :value="index"
                v-model="getCurrentQuestion.selected"
                :disabled="getCurrentQuestion.selected"
                @change="SetAnswer">


             <span>{{ option }}</span>   
        </label>
      </div>

      <button
          @click="NextQuestion"
          :disabled="!getCurrentQuestion.selected">
          {{ 
              getCurrentQuestion.index == questions.length - 1
                ? 'Podsumowanie'
                : getCurrentQuestion.selected == null
                    ? 'Wybierz opcję'
                    : 'Następne pytanie'
          
          }}

      </button>
    </section>
      <section v-else>
          <h2> Ukończyłeś quiz!</h2>
          <p>Twój wynik to: {{ score }} / {{ questions.length }}!</p>
      </section>

  <div id="reset">
    <reset @reset="resetQuiz"></reset>
  </div>
  
</main>


  <div id="footerb">
    <footerA>Footer-Quizotto!</footerA>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;




}

body {
    background-color: rgb(47, 11, 80);
    color: rgb(209, 174, 174);
}
   
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}

 h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
 }

 .quiz {
  background-color: rgb(32, 8, 54);
  padding: 1rem;
  width: 100%;
  max-width: 640px;
 }

 .quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quiz-info .question {
  color: rgb(209, 174, 174);
  font-size: 1.25rem;
}

.quiz-info .score {
  color: rgb(209, 174, 174);
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}

.option {
  display: block;
  padding: 1rem;
  background-color: rgb(58, 19, 95);
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  background-color: rgb(49, 19, 97);
}

.option.correct {
  background-color: rgb(22, 165, 70);
}

.option.wrong {
  background-color: red;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;

  padding: 0.5rem 1rem;
  background-color: rgb(8, 44, 32);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.25rem;
  border-radius: 0.5rem;
}

button:disabled {
  opacity: 0.5;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: rgb(5, 255, 172);
  font-size: 1.25rem;
  text-align: center;
}

#reset {
  margin-top: 2rem;
}

#footerb {
  width: 100%;
  background-color: rgb(32, 8, 54);
  color: rgb(209, 174, 174);
  position: fixed;

  left: 0;
  bottom:0;
  right:0;
}


</style>