class PostConfig {

    private config = {
        headers: {'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'},
    };

    public getConfig() {
        return this.config;
    }
}
export { PostConfig };
