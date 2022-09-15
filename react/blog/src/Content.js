import {BlogGird} from './BlogGrid';
import {IntroMenu} from './IntroMenu';

function Content(props) {
    return(
        <div class="content">
            {/* <!-- Grid --> */}
            <BlogGird />
            {/* <!-- END GRID --> */}

            {/* <!-- Introduction menu --> */}
            <IntroMenu />

            {/* <!-- END content --> */}
        </div>
    );
}

export {Content};