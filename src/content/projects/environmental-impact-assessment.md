---
title: Environmental Impact Assessment System
order: 1
year: '2026'
role: Solo build - data, models, app
summary: An eight-page Streamlit platform that reads air-quality, health and city data, scores environmental risk from 0 to 100 and recommends what to do about it.
what:
  - Trains and compares 5 machine learning and 2 deep learning models (Random Forest, XGBoost, PyTorch ANN and LSTM) on city-type, health-impact and UCI air-quality datasets.
  - Classifies a city's type and the likely health impact of its pollution levels, and forecasts air quality over time.
  - Combines the outputs into a composite Environmental Risk Score from 0 to 100 with four levels - Safe, Caution, Alert and Critical.
  - Recommends mitigation strategies and writes an environmental report, using GPT-4o-mini when a key is set and a template engine when it is not.
  - Presents everything across eight Streamlit pages with interactive Plotly charts.
why: Air-quality numbers are published everywhere, but they rarely tell a city what the numbers mean for people's health or what to change. I wanted one place that goes from raw pollution readings to a risk level and a plan, and I wanted to see how classic ML and deep learning actually compare on the same real data.
stack:
  Language: [Python]
  Machine Learning: [scikit-learn, Random Forest, XGBoost]
  Deep Learning: [PyTorch, ANN, LSTM]
  App & Charts: [Streamlit, Plotly]
  AI Reports: [OpenAI GPT-4o-mini (optional)]
problems:
  - problem: The LSTM I expected to win at time-series forecasting scored an R² of about 0.64, well below the Random Forest at about 0.84.
    fix: Stopped hard-coding the model choice. The app now evaluates every trained model on held-out data and auto-selects the one with the lowest test RMSE, so a weaker model can never silently ship.
  - problem: Three datasets arrived with different columns, units and missing values, which broke a single training script.
    fix: Wrote a separate preprocessing step per dataset and one train_all_models.py entry point that cleans, trains, evaluates and saves every model in a repeatable order.
  - problem: The AI report page crashed for anyone without an OpenAI key, which is most people who clone a college project.
    fix: Added a template-based report generator as the default path. GPT-4o-mini is used only when a key is present in .env.
  - problem: Health-impact predictions could easily be read as medical advice.
    fix: Labelled every health output as an analytical estimate and added clear disclaimers that the app is not for medical or emergency decisions.
metrics:
  - label: City-type classification accuracy
    value: 98.99
    decimals: 2
    suffix: '%'
  - label: Health-impact classification accuracy
    value: 96.5
    decimals: 2
    suffix: '%'
  - label: Air-quality forecast R²
    value: 0.84
    decimals: 2
  - label: Models trained and compared
    value: 7
limitations:
  - Health predictions are analytical estimates, not medical diagnoses.
  - Predictions rely on historical data and may not reflect current conditions.
repo: https://github.com/praveenraj2608/Environmental-Impact-Assessment-System
status: shipped
draftProblems: true
---
