// jsx页面无法写style样式，只能外引
import '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: 'no one'
        }
    },
    render() {
        return(
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}