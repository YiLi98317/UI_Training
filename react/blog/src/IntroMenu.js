import {AboutCard} from './AboutCard';
import {Posts} from './Posts';
import {Labels} from './Labels';

function IntroMenu(props) {
    return(
        <div class="block intro" id="intro">
          {/* <!-- About Card --> */}
          <AboutCard />

          {/* <!-- Posts --> */}
          <Posts />

          {/* <!-- Labels / tags --> */}
          <Labels />

          {/* <!-- END Introduction Menu --> */}
        </div>
    );
}

export {IntroMenu};