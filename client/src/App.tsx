import { MealerContextProvider } from './store/mealerContext';
import Header from './components/Header';
import './styles/index.scss'

const App = () => (
  <MealerContextProvider>
    <Header/>
  </MealerContextProvider>
)

export default App
