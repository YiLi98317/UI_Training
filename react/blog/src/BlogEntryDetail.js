function BlogEntryDetail(props) {
    return(
        <div class="container">
            <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem
                euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed
                ultricies mi non congue ullam corper. Praesent tincidunt sed
                tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida
                diam non fringilla.</p>
            <div class="w3-row">
                <div class="w3-col m8 s12">
                    <p><button class="w3-button w3-padding-large w3-white w3-border"><b>READ MORE
                        »</b></button></p>
                </div>
                <div class="w3-col m4 w3-hide-small">
                    <p><span class="w3-padding-large w3-right"><b>Comments  </b> <span
                        class="w3-tag">0</span></span></p>
                </div>
            </div>
        </div>
    );
}

export {BlogEntryDetail};