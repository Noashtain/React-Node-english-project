import { Outlet, Route, HashRouter as Router, Routes } from "react-router-dom";
import DashLayout from "./components/layout/dash/DashLayout";
import SiteLayout from "./components/layout/site/SiteLayout";
import LoginPage from "./features/auth/login/LoginPage";
import RequireAuth from "./features/auth/login/RequireAuth";
import AddSchool from "./features/companies/add/AddSchool";
import SchoolList from "./features/companies/list/SchoolList";
import AddUser from "./features/users/add/AddUser";
import UsersList from "./features/users/list/UsersList";
import SingleUser from "./features/users/view/SingleUser";
import AddWordsList from "./features/actions/listWord/add/AddWordsList";
import ListWord from "./features/actions/listWord/list/ListWord";
import SingleListWord from "./features/actions/listWord/view/SingleListWord";
import AddClass from "./features/companies/addClass/AddClass";
import SingleClass from "./features/companies/view/SingleClass";

import Test from "./features/actions/listWord/test/Test";
import PersistLogin from "./features/auth/PersistLogin";
import CurrentSchoolAndClass from "./features/companies/CurrentSchoolAndClass/CurrentSchoolAndClass";

import WelcomePage from "./WelcomePage";
import ListMarkStudents from "./features/actions/ListMarkStudents";
import Words from "./features/actions/listWord/view/Words";
import Todos from "./features/actions/todos/Todos";

import MainPage from "./MainPage";
import MarksByStudent from "./features/actions/MarksByStudent";
import HangmanGame from "./features/actions/game/HangmanGame";
import MemoryGame from "./features/actions/game/MemoryGame";
import MultiChoiceGame from "./features/actions/game/MultiChoiceGame";
import Play from "./features/actions/game/Play";
import WordsGame from "./features/actions/game/WordsGame";
import MainGraphs from "./features/actions/graphs/MainGraphs";
import Tips from "./features/actions/tips/Tips";
import Comments from "./features/comments/Comment";
import FutureSimpleRules from "./features/grammarRules/FutureSimpleRules";
import GrammarRules from "./features/grammarRules/GrammarRules";
import IrregularVerbs from "./features/grammarRules/IrregularVerbs";
import PastSimpleRules from "./features/grammarRules/PastSimpleRules";
import PresentContinuousRules from "./features/grammarRules/PresentContinuousRules";
import VerbsExplanation from "./features/grammarRules/VerbsExplanation";
import Instructions from "./features/instructions/Instructions";
import StudentInstructions from "./features/instructions/StudentInstructions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowRoles={["Teacher", "Student"]} />}
            >
              <Route path="/dash" element={<DashLayout />}>
                <Route index element={<MainPage />} />
                <Route element={<RequireAuth allowRoles={["Teacher"]} />}>
                  <Route
                    path="dash/choose"
                    element={<CurrentSchoolAndClass />}
                  />
                  <Route path="users" element={<Outlet />}>
                    <Route index element={<UsersList />} />
                    <Route path=":class_id" element={<UsersList />} />

                    <Route path="add" element={<AddUser />} />
                    <Route path="update/:userId" element={<SingleUser />} />
                    <Route path="markbystudent/:_id" element={<MarksByStudent />} />
                  </Route>
                  <Route path="companies" element={<Outlet />}>
                    <Route index element={<SchoolList />} />
                    <Route path="add" element={<AddSchool />} />
                    <Route path=":school" element={<SingleClass />} />
                    <Route path="class/:school_id" element={<AddClass />} />
                  </Route>
                  <Route path="instructions" element={<Instructions />} />
                  {/* <Route path="settings"element={<Translation />}/> */}

                  <Route path="choose-school-and-class" element={<CurrentSchoolAndClass />} />
                </Route>

                {/* <Route path="dash/actions" element={<LayoutActions />}> */}
                <Route index element={<MainPage />} />
                <Route path="choose" element={<CurrentSchoolAndClass />} />
                <Route path="personalldetails" element={<SingleUser notForATeacher="true" />} />
                <Route path="tips" element={<Tips />} />


                <Route path="student-instruction" element={<StudentInstructions />} />
                <Route path="gramar-rules" element={<GrammarRules />} />
                <Route path="gramar-rules/past-simple-rules" element={<PastSimpleRules />} />
                <Route path="gramar-rules/future-simple-rules" element={<FutureSimpleRules />} />
                <Route path="gramar-rules/verb-explanation" element={<VerbsExplanation />} />
                <Route path="gramar-rules/verb-explanation" element={<VerbsExplanation />} />
                <Route path="gramar-rules/verb-explanation/irregular-rules" element={<IrregularVerbs />} />
                <Route path="gramar-rules/present-continuous-rules" element={<PresentContinuousRules />} />
                <Route path="comments" element={<Comments />} />
                <Route path="comments/:title/:test_id" element={<Comments />} />

                <Route path="wordsList" element={<ListWord />} />
                <Route path="play/:_id/wordgame" element={<WordsGame />} />
                <Route path="play/:_id/memory" element={<MemoryGame />} />
                <Route path="play/:_id/multi-choice" element={<MultiChoiceGame />} />
                <Route path="play/:_id/hangman" element={<HangmanGame />} />
                {/* <Route path="play/puzzle/:_id" element={<PuzzleGame />} /> */}
                <Route path="wordsList/marks/:wordlist_id/comments/:title/:test_id/:userId" element={<Comments />} />
                <Route path="add-test" element={<AddWordsList />} />
                <Route path="todos" element={<Todos />} />
                <Route path="play/:_id" element={<Play />} />
                <Route path="play" element={<Play />} />
                <Route path="graphs" element={<MainGraphs />} />
                <Route path="wordsList/marks/:_id" element={<ListMarkStudents />} />

                <Route path="words/:_id" element={<Words />} />
                <Route path=":_id" element={<SingleListWord />} />
                <Route path="test/:trying/:_id" element={<Test />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;