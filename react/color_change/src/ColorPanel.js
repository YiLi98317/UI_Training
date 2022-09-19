export default function ColorPanel(props) {
    return(
        <div>
            <h2>
                This is the color panel:
            </h2>
            <div className="color-panel" 
                style={props.style}
            />
        </div>
    );
}