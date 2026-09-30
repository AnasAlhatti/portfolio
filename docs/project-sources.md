# Project content sources

Project engineering choices were checked against the public repository READMEs on 30 September 2026. Each repository uses the `master` branch.

| Project | Source | Documented implementation |
| --- | --- | --- |
| Matte AI | [README](https://github.com/AnasAlhatti/Matte/blob/master/README.md) | Next.js, FastAPI, and Langflow processes; asynchronous orchestration; MySQL; DAG canvas; persistent RAG; runtime provider-key injection |
| Smart Hospital | [README](https://github.com/AnasAlhatti/Smart-Hospital-Appointment-System/blob/master/README.md) | Thymeleaf and React; Spring Security roles; HttpOnly sessions; JPA/MySQL; OpenFDA; EC2, systemd, and PM2 |
| FinanceApp | [README](https://github.com/AnasAlhatti/Financeapp/blob/master/README.md) | Clean Architecture/MVVM; domain use cases; Room/DAO; DataStore; Hilt; Coroutines/Flow |
| BookManager | [README](https://github.com/AnasAlhatti/Book-Manager/blob/master/README.md) | MVVM; repository merging Room/Firestore; local-only mode; authenticated synchronization and guest access; DataStore preferences |
| BMI Calculator | [README](https://github.com/AnasAlhatti/BMI-Calculator/blob/master/README.md) | Kotlin/Compose; simple state management; data/ui/utils organization; unit switching and calculation history |

The portfolio describes documented choices without claiming independent verification of these applications. It omits uptime and performance metrics, ambiguous security guarantees, and roadmap features. FinanceApp receipt scanning is a placeholder; OCR and cloud sync are not described as completed features. BookManager uses RecyclerView/Fragments rather than Compose. BMI Calculator does not name a database or a more complex architecture.

English and Turkish copy lives in `src/content/translations.js`; repository links and screenshot data live in `src/content/projects.js`. Update both locales when changing content, and distinguish documented implementation from your own explanation of its motivation.
