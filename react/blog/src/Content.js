import {BlogGird} from './BlogGrid';
import {IntroMenu} from './IntroMenu';

function Content(props) {
    return(
        <div class="content">
            {/* <!-- Grid --> */}
            <BlogGird blogs={props.content.blogs} />
            {/* <!-- END GRID --> */}

            {/* <!-- Introduction menu --> */}
            <IntroMenu intro={props.content.intro} />

            {/* <!-- END content --> */}
        </div>
    );
}

export {Content};