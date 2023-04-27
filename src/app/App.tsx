

import './styles/global.css'

import {Main} from "pages/main";
import {withProviders} from "./providers";
import {ProtectedNetwork} from "processess/protectedNetwork";
import {SetIsOwner} from "processess/setIsOwner";


const App = () => {
  return (
      <ProtectedNetwork>
          <SetIsOwner>
              <Main />
          </SetIsOwner>
      </ProtectedNetwork>
  );
};

export default withProviders(App);
