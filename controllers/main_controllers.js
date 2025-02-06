const express = require('express');
const data = require('../models/data_model.js');
const user = require('../models/user_model.js');
const savings = require('../models/savings_model.js')

module.exports.dashboard = async (req, res) => {
    if (res.locals.currentUser) {
        const userData = await user.findById(req.user._id).populate('data');
        if (userData.data.length > 0) {
            res.redirect(`/trackmint/${req.user._id}/dashboard`);
        } else {
            res.render('dashboard.ejs', { currentUser: req.user.username });
        }
    } else {
        res.render('dashboard.ejs');
    }
};

module.exports.userDashboard = async (req, res) => {
    try {
        const userData = await user.findById(req.user._id).populate('data')

        const monthlyData = userData.data.reduce((acc, curr) => {
            const monthKey = `${curr.date.month} ${curr.date.year}`;
            if (!acc[monthKey]) {
                acc[monthKey] = {
                    earnings: 0,
                    expenses: 0,
                    earningsCategory: [],
                    expensesCategory: [],
                    earnCategoryAmounts: {},
                    expCategoryAmounts: {}
                }
            }

            acc[monthKey].earnings += curr.earnings.amount;
            acc[monthKey].expenses += curr.expenses.amount;

            // Extract categories as needed
            acc[monthKey].earningsCategory = [...new Set([...acc[monthKey].earningsCategory, ...curr.earnings.category])];
            acc[monthKey].expensesCategory = [...new Set([...acc[monthKey].expensesCategory, ...curr.expenses.category])];

            // Ensure `categoryAmounts` are not Mongoose Map objects
            if (curr.earnings.categoryAmounts instanceof Map) {
                acc[monthKey].earnCategoryAmounts = Object.fromEntries(curr.earnings.categoryAmounts);
            } else {
                acc[monthKey].earnCategoryAmounts = curr.earnings.categoryAmounts;
            }

            if (curr.expenses.categoryAmounts instanceof Map) {
                acc[monthKey].expCategoryAmounts = Object.fromEntries(curr.expenses.categoryAmounts);
            } else {
                acc[monthKey].expCategoryAmounts = curr.expenses.categoryAmounts;
            }

            return acc;
        }, {});

        res.render('user_dashboard.ejs', {
            userData,
            monthlyData: Object.entries(monthlyData)
        });
    } catch (err) {
        console.log(err);
        res.redirect('/trackmint');
    }
};

module.exports.data = (req, res) => {
    res.render('data.ejs')
}

module.exports.addData = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
            'date.month': month,
            'date.year': year,
            'earnings.amount': earningsAmounts,
            'earnings.category': earningsCategories,
            'expenses.amount': expensesAmounts,
            'expenses.category': expensesCategories,
            notes
        } = req.body;

        // Create categoryAmounts map for earnings
        const earningsCategoryAmounts = {};
        if (Array.isArray(earningsCategories)) {
            earningsCategories.forEach((category, index) => {
                if (category && earningsAmounts[index]) {
                    earningsCategoryAmounts[category] = parseFloat(earningsAmounts[index] || 0);
                }
            });
        }

        // Create categoryAmounts map for expenses
        const expensesCategoryAmounts = {};
        if (Array.isArray(expensesCategories)) {
            expensesCategories.forEach((category, index) => {
                if (category && expensesAmounts[index]) {
                    expensesCategoryAmounts[category] = parseFloat(expensesAmounts[index] || 0);
                }
            });
        }

        // Calculate totals
        const totalEarnings = Object.values(earningsCategoryAmounts).reduce((sum, amount) => sum + amount, 0);
        const totalExpenses = Object.values(expensesCategoryAmounts).reduce((sum, amount) => sum + amount, 0);

        const newDataEntry = {
            date: { month, year },
            earnings: {
                category: Object.keys(earningsCategoryAmounts),
                amount: totalEarnings,
                categoryAmounts: earningsCategoryAmounts
            },
            expenses: {
                category: Object.keys(expensesCategoryAmounts),
                amount: totalExpenses,
                categoryAmounts: expensesCategoryAmounts
            },
            notes
        };

        const savedData = await data.create(newDataEntry);
        const userData = await user.findById(userId);
        userData.data.push(savedData);
        await userData.save();

        req.flash('success', 'Your data has been succesfully recorded!')
        res.redirect(`/trackmint/${userId}/dashboard`);
    } catch (error) {
        console.error('Error adding data:', error);
        req.flash('error', 'There was an error while adding your data!')
        res.status(500).redirect('/trackmint');
    }
};

module.exports.journal = async (req, res) => {
    const userData = await user.findById(req.user._id).populate('data')
    const details = userData.data.map(d => ({
        month: d.date.month,
        year: d.date.year,
        earnings: d.earnings.amount,
        expenses: d.expenses.amount,
        earningsCat: d.earnings.category,
        expenseCat: d.expenses.category,
        notes: d.notes,
        id: d._id
    }))


    res.render('journal.ejs', { details })
}

module.exports.note = async (req, res) => {
    try {
        const { docId, note } = req.body

        const updatedData = await data.findByIdAndUpdate(docId, { notes: note }, { new: true });

        if (!updatedData) {
            console.error("Document not found!")
        }

        res.json({ success: true, note: updatedData.notes })
    }

    catch (err) {
        console.error('error updating data', err)
    }

}

module.exports.getManagePage = async (req, res) => {
    const userData = await user.findById(req.user._id).populate('data')
    const details = userData.data.map(d => ({
        month: d.date.month,
        year: d.date.year,
        earnings: d.earnings.amount,
        expenses: d.expenses.amount,
        earningsCat: d.earnings.category,
        expenseCat: d.expenses.category,
        notes: d.notes,
        id: d._id
    }))

    res.render('manage.ejs', { details })
}

module.exports.delete = async (req, res) => {
    try {
        const { id, documentId } = req.params
        const deletedData = await data.findByIdAndDelete(documentId)
        await user.findByIdAndUpdate(id, { $pull: { data: documentId } })
        req.flash('success', 'Your data has been successfully deleted!')
        res.redirect(`/trackmint/data/${id}/manage`)
    }
    catch (e) {
        req.flash('error', 'There was a problem while deleting you data!')
        res.redirect(`trackmint/${req.user._id}/dashboard`)
    }
}

module.exports.getEditPage = async (req, res) => {
    const { id, documentId } = req.params
    const foundData = await data.findById(documentId)
    res.render('edit.ejs', { foundData })
}

module.exports.edit = async (req, res) => {
    try {
        const { id, documentId } = req.params;
        const {
            'date.month': month,
            'date.year': year,
            'earnings.amount': earningsAmounts,
            'earnings.category': earningsCategories,
            'expenses.amount': expensesAmounts,
            'expenses.category': expensesCategories,
            notes
        } = req.body;

        // Create categoryAmounts map for earnings
        const earningsCategoryAmounts = {};
        if (Array.isArray(earningsCategories)) {
            earningsCategories.forEach((category, index) => {
                if (category && earningsAmounts[index]) {
                    earningsCategoryAmounts[category] = parseFloat(earningsAmounts[index] || 0);
                }
            });
        }

        // Create categoryAmounts map for expenses
        const expensesCategoryAmounts = {};
        if (Array.isArray(expensesCategories)) {
            expensesCategories.forEach((category, index) => {
                if (category && expensesAmounts[index]) {
                    expensesCategoryAmounts[category] = parseFloat(expensesAmounts[index] || 0);
                }
            });
        }

        // Calculate totals
        const totalEarnings = Object.values(earningsCategoryAmounts).reduce((sum, amount) => sum + amount, 0);
        const totalExpenses = Object.values(expensesCategoryAmounts).reduce((sum, amount) => sum + amount, 0);

        const updatedData = {
            date: { month, year },
            earnings: {
                category: Object.keys(earningsCategoryAmounts),
                amount: totalEarnings,
                categoryAmounts: earningsCategoryAmounts
            },
            expenses: {
                category: Object.keys(expensesCategoryAmounts),
                amount: totalExpenses,
                categoryAmounts: expensesCategoryAmounts
            },
            notes
        };

        await data.findByIdAndUpdate(documentId, updatedData);
        req.flash('success', 'Your data has been successfully edited!')
        res.redirect(`/trackmint/data/${id}/manage`);
    }
    catch (e) {
        req.flash('error', 'There was a problem while editing your data!')
        res.redirect(`/trackmint/${req.user._id}/dashboard`)
    }
}

module.exports.savings = async (req, res) => {
    const userData = await user.findById(req.user._id).populate('savings')
    res.render('savings.ejs', { userData })
}

module.exports.addMoney = async (req, res) => {
    const userData = await user.findById(req.user._id).populate('savings')
    const { amount } = req.body

    const parsedAmount = parseFloat(amount);

    try {
        if (userData.savings) {
            const currentSaving = await savings.findById(userData.savings);
            // Convert existing savings to number and add new amount
            const currentAmount = Number(currentSaving.savings);
            currentSaving.savings = currentAmount + parsedAmount;
            await currentSaving.save();
        } else {
            // Create new savings with parsed number amount
            const newSaving = new savings({ savings: parsedAmount });
            await newSaving.save();
            userData.savings = newSaving._id;
            await userData.save();
        }
    }
    catch (e) {
        req.flash('error', 'There was a problem while added your saving!')
    }

    req.flash('success', `Saving of ${parsedAmount} deposited`)
    res.redirect(`/trackmint/${req.user._id}/savings`)
}

module.exports.minusMoney = async (req, res) => {
    const userData = await user.findById(req.user._id).populate('savings')
    const { amount } = req.body

    const parsedAmount = parseFloat(amount);

    if (userData.savings) {
        const currentSaving = await savings.findById(userData.savings);
        // Convert existing savings to number and add new amount
        const currentAmount = Number(currentSaving.savings);
        currentSaving.savings = currentAmount - parsedAmount;
        await currentSaving.save();
    } else {
        // Create new savings with parsed number amount
        const newSaving = new savings({ savings: parsedAmount });
        await newSaving.save();
        userData.savings = newSaving._id;
        await userData.save();
    }

    req.flash('success', `Saving of ${parsedAmount} withdrawn`)
    res.redirect(`/trackmint/${req.user._id}/savings`)
}