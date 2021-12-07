export function CustomDecorator(params) {
    return function(target) {
        target.prototype.framework = params.framework
    }
}