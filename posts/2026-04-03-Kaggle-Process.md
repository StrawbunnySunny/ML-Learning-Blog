Choose the model 
- Gradient boosting models (the main models I’m familiar with) 
- LGBM (Light gradient boosting model) 
- Catboost
- XGboost
- Random forest
- Logarithmic regression
- Ensemble

Data cleaning → can create a data pipeline to automate & speed up process
- Removing noise
- Restoring missing values using multiple imputation/fill forward/interpolation
- Fixing class imbalance
- Treat outliers
- Remove
- Cap/floor (winsorization) 

Feature engineering
- Intersection 
- Creating new features
- SHAP technique 

Hyperparameter tuning
- Optuna (partially luck based, depends on which hyperparameters you can find) 
- Grid search (faster but Optuna is better) 

Training vs validation vs testing 
- Traditional split of 0.6, 0.2 and 0.2 (but other mixes can work too) 

Trouble shooting 
- Fixing data leakage 
- Fixing an overfitted model 
- Fixing an underfitted model
- Identify the model’s mistakes 
- Use a confusion matrix 

BIGGEST TIP from reddit
Data is the most important. You cannot have a good model if your data is bad. Spend some time to clean it properly, remove bad samples and replace missing values.
