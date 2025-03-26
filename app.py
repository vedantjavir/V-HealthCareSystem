import streamlit as st
import pandas as pd
import plotly.graph_objects as go
from datetime import datetime, timedelta
import random
from PIL import Image
import requests
from io import BytesIO

# Configure the page
st.set_page_config(
    page_title="HealthTrack Dashboard",
    page_icon="🏥",
    layout="wide"
)

# Add custom CSS
st.markdown("""
    <style>
    .main {
        padding: 2rem;
    }
    .metric-card {
        background-color: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        margin-bottom: 1rem;
    }
    .recommendation-card {
        background-color: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        margin-bottom: 1rem;
    }
    </style>
""", unsafe_allow_html=True)

# Generate mock health data
def generate_health_data():
    data = []
    for i in range(7):
        date = datetime.now() - timedelta(days=i)
        data.append({
            'date': date,
            'heart_rate': 65 + random.randint(0, 20),
            'steps': 5000 + random.randint(0, 7000),
            'calories': 1800 + random.randint(0, 800),
            'sleep': 6 + random.random() * 2,
            'stress': random.randint(0, 100)
        })
    return pd.DataFrame(data)

# Mock recommendations data
recommended_doctors = [
    {
        'name': 'Dr. Sarah Johnson',
        'specialty': 'Cardiologist',
        'hospital': 'Central Hospital',
        'rating': 4.8,
        'distance': '2.5 miles',
        'image_url': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
    },
    {
        'name': 'Dr. Michael Chen',
        'specialty': 'General Physician',
        'hospital': 'City Medical Center',
        'rating': 4.7,
        'distance': '1.8 miles',
        'image_url': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300'
    }
]

recommended_exercises = [
    {
        'name': 'Morning Walk',
        'duration': '30 minutes',
        'intensity': 'Low',
        'calories': 150,
        'description': 'Start your day with a brisk walk to improve cardiovascular health'
    },
    {
        'name': 'Yoga Session',
        'duration': '20 minutes',
        'intensity': 'Medium',
        'calories': 100,
        'description': 'Focus on stretching and breathing exercises to reduce stress'
    }
]

diet_recommendations = [
    {
        'meal': 'Breakfast',
        'foods': ['Oatmeal', 'Berries', 'Greek Yogurt'],
        'nutrients': {'protein': 20, 'carbs': 45, 'fats': 10}
    },
    {
        'meal': 'Lunch',
        'foods': ['Grilled Chicken', 'Quinoa', 'Steamed Vegetables'],
        'nutrients': {'protein': 30, 'carbs': 40, 'fats': 15}
    }
]

# Header
st.title('🏥 HealthTrack Dashboard')
st.markdown('Track your health metrics and get personalized recommendations')

# Generate and load data
health_data = generate_health_data()

# Health Metrics Section
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.markdown("""
        <div class="metric-card">
            <h3>Heart Rate</h3>
            <h2>%d bpm</h2>
        </div>
    """ % health_data.iloc[0]['heart_rate'], unsafe_allow_html=True)

with col2:
    st.markdown("""
        <div class="metric-card">
            <h3>Steps</h3>
            <h2>%d</h2>
        </div>
    """ % health_data.iloc[0]['steps'], unsafe_allow_html=True)

with col3:
    st.markdown("""
        <div class="metric-card">
            <h3>Calories</h3>
            <h2>%d kcal</h2>
        </div>
    """ % health_data.iloc[0]['calories'], unsafe_allow_html=True)

with col4:
    st.markdown("""
        <div class="metric-card">
            <h3>Sleep</h3>
            <h2>%.1f hrs</h2>
        </div>
    """ % health_data.iloc[0]['sleep'], unsafe_allow_html=True)

# Health Trends Chart
st.subheader('Weekly Health Trends')
fig = go.Figure()
fig.add_trace(go.Scatter(
    x=health_data['date'],
    y=health_data['heart_rate'],
    name='Heart Rate',
    line=dict(color='#ef4444')
))
fig.add_trace(go.Scatter(
    x=health_data['date'],
    y=health_data['stress'],
    name='Stress Level',
    line=dict(color='#8b5cf6')
))
fig.update_layout(
    plot_bgcolor='white',
    margin=dict(t=20, l=20, r=20, b=20),
    height=400
)
st.plotly_chart(fig, use_container_width=True)

# Recommendations Section
st.subheader('Personalized Recommendations')
rec_col1, rec_col2, rec_col3 = st.columns(3)

# Doctors Recommendations
with rec_col1:
    st.markdown("### 👨‍⚕️ Recommended Doctors")
    for doctor in recommended_doctors:
        response = requests.get(doctor['image_url'])
        img = Image.open(BytesIO(response.content))
        st.image(img, width=100)
        st.markdown(f"**{doctor['name']}**")
        st.markdown(f"{doctor['specialty']} • {doctor['hospital']}")
        st.markdown(f"⭐ {doctor['rating']} • {doctor['distance']}")
        st.markdown("---")

# Exercise Recommendations
with rec_col2:
    st.markdown("### 🏃‍♂️ Recommended Exercises")
    for exercise in recommended_exercises:
        st.markdown(f"**{exercise['name']}**")
        st.markdown(f"⏱️ {exercise['duration']} • 🔥 {exercise['calories']} cal")
        st.markdown(f"_{exercise['description']}_")
        st.markdown("---")

# Diet Recommendations
with rec_col3:
    st.markdown("### 🍎 Diet Recommendations")
    for diet in diet_recommendations:
        st.markdown(f"**{diet['meal']}**")
        st.markdown("Foods:")
        for food in diet['foods']:
            st.markdown(f"• {food}")
        st.markdown("Nutrients:")
        col1, col2, col3 = st.columns(3)
        with col1:
            st.markdown(f"Protein: {diet['nutrients']['protein']}g")
        with col2:
            st.markdown(f"Carbs: {diet['nutrients']['carbs']}g")
        with col3:
            st.markdown(f"Fats: {diet['nutrients']['fats']}g")
        st.markdown("---")