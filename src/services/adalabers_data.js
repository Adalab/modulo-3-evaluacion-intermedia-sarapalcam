function adalabersApi() {
   return fetch('https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json')
    .then(response => response.json())
} 

const objectFunctionsToExport = {
    adalabersApi: adalabersApi
}

export default objectFunctionsToExport;