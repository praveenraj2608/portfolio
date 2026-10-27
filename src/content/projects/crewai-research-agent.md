---
title: Multi-Agent AI Research Assistant
order: 2
year: '2026'
role: Solo build - agent design, orchestration
summary: Three CrewAI agents that search the web, analyse what they find and hand back a structured research report on any topic you type.
what:
  - Takes a research topic from the terminal and runs a crew of three specialised agents in sequence.
  - The Research Specialist searches the web through DuckDuckGo for facts and recent developments.
  - The Data Analyst filters the findings, pulls out insights and trends, and organises them.
  - The Technical Writer turns the analysis into a structured final report printed as FINAL REPORT.
  - Works with OpenAI or any other LLM provider supported by litellm, configured through a .env file.
why: Researching a new topic means opening twenty tabs, skimming, and then writing it all up. I wanted to see whether splitting that job into roles - finder, analyst, writer - and giving each one to an agent would produce a better report than a single prompt, and to learn agent orchestration hands-on.
stack:
  Language: [Python 3.10+]
  Agents: [CrewAI, LangChain]
  LLM: [OpenAI API, litellm-compatible providers]
  Tools: [DuckDuckGo Search]
  Config: [python-dotenv (.env)]
problems:
  - problem: Runs failed halfway with insufficient_quota errors, because every agent step is an LLM call and the crew burns through credits fast.
    fix: Moved keys and the model choice into .env so the provider can be switched through litellm, and documented the quota requirement up front so the failure is expected and explained.
  - problem: Agents overlapped - the analyst re-searched the web and the writer re-analysed raw results - which wasted calls and produced repetitive reports.
    fix: Tightened each agent's role, goal and backstory, and gave every task an explicit expected output so each agent hands a clean result to the next one in sequence.
  - problem: Raw web search results were noisy and sometimes off-topic.
    fix: Made filtering the analyst's explicit job, so only relevant, organised findings reach the writer.
repo: https://github.com/praveenraj2608/crewai-research-agent
status: shipped
draftProblems: true
---
