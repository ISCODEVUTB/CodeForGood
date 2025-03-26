from fastapi import FastAPI

app = FastAPI()

@app.get("/analytics/donors/count")
def count_donors():
    return {"total_donors": len(donors_db)}

@app.get("/analytics/volunteers/count")
def count_volunteers():
    return {"total_volunteers": len(volunteers_db)}

@app.get("/analytics/summary")
def summary():
    return {
        "total_donors": len(donors_db),
        "total_volunteers": len(volunteers_db)
    }
