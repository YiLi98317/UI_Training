import {AboutCard} from './AboutCard';
import {Posts} from './Posts';
import {Labels} from './Labels';

function IntroMenu(props) {
    return(
        <div class="block intro" id="intro">
          {/* <!-- About Card --> */}
          <AboutCard />

          {/* <!-- Posts --> */}
          <Posts posts={props.intro.posts} />

          {/* <!-- Labels / tags --> */}
          <Labels labels={props.intro.labels} />

          {/* <!-- END Introduction Menu --> */}
        </div>
    );
}

export {IntroMenu};