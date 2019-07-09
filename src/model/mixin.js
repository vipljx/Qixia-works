export const Mixins={
    data() {
        return {
            a:1
        }
    },
    methods: {
        getZwDict(){
            return new Promise(fn=>{
                this.$get("/dictController/getZwDict",{},4).then((res)=>{
                    //console.log(res.append)
                    if(res.result=='success'){
                        this.ZwDictList=res.append?res.append:[];
                        fn();
                    }
                }).catch(function(msg){
                    console.log(msg);
                });
                
            })

            
        },
        getCertTypeDict(){
            return new Promise(fn=>{
                this.$get("/dictController/getCertTypeDict",{},4).then((res)=>{
                    //console.log(res.append)
                    if(res.result=='success'){
                        this.CertTypeDictList=res.append?res.append:[];
                        fn();
                    }
                }).catch(function(msg){
                    console.log(msg);
                });
                
            })
            
        },
    },
}
