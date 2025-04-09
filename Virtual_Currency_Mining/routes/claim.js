const express = require('express');
const router = express.Router()
const User = require('../models/User');

const coins_per_hour = 5;
const max_daily_coins = 100;
const max_coins_claim = 10;

router.post('/claim', async(req, res) => {
    const {username} = req.body;
    try{
        let user = await User.findOne({ where : {username}}) 
        if(!user){
            /*This code is added to check functionality*/
            //const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
            user = await User.create({
                username,
                balance:0,
                lastClaimAt: new Date(),  //twoHoursAgo,
                minedSince: new Date(),  //twoHoursAgo,  /*change the value here*/
                earnToday: 0,
            })
        }
        const now = new Date();
        const minedSince = new Date(user.minedSince);
        const diffInHours = Math.floor((now-minedSince)/(1000*60*60));
        let coinsToClaim = Math.min(max_coins_claim, diffInHours * coins_per_hour)

        const isNewDay = user.lastClaimAt || new Date(user.lastClaimAt).toDateString() !== now.toDateString();
        
        if(isNewDay){
            user.dailyTotal =0;
        }
        if(user.dailyTotal >= max_daily_coins){
            return res.status(400).json({error: 'Daily Limit Reached'});
        }

        coinsToClaim = Math.min(coinsToClaim, max_daily_coins - user.dailyTotal);
        if(coinsToClaim <= 0){
            return res.status(400).json({error:'No coins to claim yet'})
        }

        user.balance += coinsToClaim;
        user.lastClaimAt = now;
        user.minedSince = now;
        user.earnToday += coinsToClaim;

        await user.save();
        
        /*Output - {"message": "Claimed 10 coins","balance": 10}*/
        res.json({message: `Claimed ${coinsToClaim} coins`, balance: user.balance})
    }catch(err){
        res.status(500).json({error: 'Server Error'});
    }  
})

module.exports=router;