import cryptoModel from '../models/crypto.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express from 'express';
const Router=express.Router;
dotenv.config()
export async function fetchApi(id) {
    try {
        const data = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&x_cg_demo_api_key=${process.env.API}`);
        if (!data.ok) {
            throw new error(`API request failed with status ${data.status}`);
        }

        const response = await data.json();
        return response;
        }
    catch (err) {
        return `something is wrong:${err.message}`
    }
}
export async function insertintoDatabase(){
    const bitcoin=await fetchApi('bitcoin');
    const maticNetwork=await fetchApi('matic-network');
    const ethereum=await fetchApi('ethereum')
    const array=[bitcoin.bitcoin,maticNetwork['matic-network'],ethereum.ethereum]
    const referenceArray=['bitcoin','matic-network','ethereum']
    console.log(array)
    const insert=array.map(async(coin,i)=>{
          await cryptoModel.create({
                id:`${referenceArray[i]}`,
                price:coin.usd,
                usd_market_cap:coin.usd_market_cap,
                usd_24h_change:coin.usd_24h_change
            })


    })
    return insert;

}
export async function updateDatabase(){
         const bitcoin=await fetchApi('bitcoin');
        const maticNetwork=await fetchApi('matic-network');
        const ethereum=await fetchApi('ethereum')
        await cryptoModel.findOneAndUpdate({id:'bitcoin'},{
            price:bitcoin.bitcoin.usd,
            usd_market_cap:bitcoin.bitcoin.usd_market_cap,
            usd_24h_change:bitcoin.bitcoin.usd_24h_change
        })
        await cryptoModel.findOneAndUpdate({id:'matic-network'},{
            price:maticNetwork['matic-network'].usd,
            usd_market_cap:maticNetwork['matic-network'].usd_market_cap,
            usd_24h_change:maticNetwork['matic-network'].usd_24h_change
        })
        await cryptoModel.findOneAndUpdate({id:'ethereum'},{
            price:ethereum.ethereum.usd,
            usd_market_cap:ethereum.ethereum.usd_market_cap,
            usd_24h_change:ethereum.ethereum.usd_24h_change
        })
        return;

}
Router.get('/',async(req,res)=>{
         const {coin} =req.query
         if(!coin){
            return res.status(400).json({
                 error:'invalid or missing parameter'
            })
         }
         if(coin==='bitcoin'){
            const bitcoin=await cryptoModel.findOne({id:'bitcoin'})
            return res.status(200).json({
                price:bitcoin.price,
                marketCap:bitcoin.usd_market_cap,
                "24hrchange":bitcoin.usd_24h_change

            })
            
         }
         else if(coin ==='matic-network'){
            const maticNetwork=await cryptoModel.findOne({id:'matic-network'})
            return res.status(200).json({
                price:maticNetwork.price,
                marketCap:maticNetwork.usd_market_cap,
                "24hrchange":maticNetwork.usd_24h_change

            })
           
         }
         else if(coin ==='ethereum'){
            const ethereum=await cryptoModel.findOne({id:'ethereum'})
            return res.status(200).json({
                price:ethereum.price,
                marketCap:ethereum.usd_market_cap,
                "24hrchange":ethereum.usd_24h_change
            })}
        else{
            return res.status(500).send('bad request')
        }
}
)
export{Router}
