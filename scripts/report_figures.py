from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
from matplotlib import font_manager

ASSETS = Path(__file__).resolve().parents[1] / 'docs/report/assets'
font = Path('C:/Windows/Fonts/times.ttf')
if font.exists():
    font_manager.fontManager.addfont(str(font))
    plt.rcParams['font.family'] = 'Times New Roman'
plt.rcParams.update({'font.size': 12, 'axes.spines.top': False, 'axes.spines.right': False})
BLUE, PALE, INK = '#153c66', '#edf1f5', '#222222'

def diagram(name, boxes, arrows, size=(10, 4)):
    fig, ax = plt.subplots(figsize=size)
    ax.set(xlim=(0, 10), ylim=(0, 4)); ax.axis('off')
    for x, y, w, height, label in boxes:
        ax.add_patch(FancyBboxPatch((x,y),w,height,boxstyle='round,pad=0.04,rounding_size=0.05',facecolor=PALE,edgecolor=BLUE,linewidth=1.3))
        ax.text(x+w/2,y+height/2,label,ha='center',va='center',color=INK,fontsize=12)
    for start, end, label in arrows:
        ax.add_patch(FancyArrowPatch(start,end,arrowstyle='-|>',mutation_scale=13,color=BLUE,linewidth=1.2))
        if label:
            ax.text((start[0]+end[0])/2,(start[1]+end[1])/2+0.12,label,ha='center',va='bottom',fontsize=10,color=INK)
    fig.tight_layout(pad=0.6); fig.savefig(ASSETS/name,dpi=220,facecolor='white'); plt.close(fig)

def generate():
    ASSETS.mkdir(parents=True, exist_ok=True)
    diagram('logical.png', [
        (0.2,2.55,2.4,1.0,'Formularze\nprzedmiot · termin · zadanie'),
        (3.6,2.55,2.8,1.0,'Stan PlannerData\nlisty · filtr · postęp'),
        (7.5,2.55,2.2,1.0,'localStorage\nplan na urządzeniu'),
        (3.6,0.35,2.8,1.0,'Kopia JSON\nwersja · dane · relacje'),
        (0.2,0.35,2.4,1.0,'Walidacja importu\ncały plik przed zapisem'),
    ], [((2.65,3.05),(3.55,3.05),'zmiana'),((6.45,3.05),(7.45,3.05),'zapis'),((5,2.5),(5,1.4),'eksport'),((3.55,0.85),(2.65,0.85),'import'),((2.65,1.2),(3.8,2.5),'poprawny plan')])
    diagram('physical.png', [
        (0.2,2.55,2.4,1.0,'Urządzenie studenta\nprzeglądarka i frontend'),
        (0.2,0.35,2.4,1.0,'Dane lokalne\nlocalStorage i plik JSON'),
        (3.7,2.55,2.5,1.0,'GitHub Pages\nHTML · CSS · JavaScript'),
        (7.3,2.55,2.5,1.0,'GitHub Actions\ntesty i build'),
        (7.3,0.35,2.5,1.0,'Repozytorium GitHub\nbranch → PR → main'),
    ], [((3.65,3.05),(2.65,3.05),'HTTPS'),((1.4,2.5),(1.4,1.4),'zapis'),((7.25,3.05),(6.25,3.05),'dist/'),((8.55,1.4),(8.55,2.5),'CI/CD')])
    diagram('git-flow.png', [
        (0.2,1.5,1.5,1.0,'Issue\nkryteria'),(2.2,1.5,1.5,1.0,'Branch\ncommity'),
        (4.2,1.5,1.5,1.0,'Pull Request\nprzegląd i CI'),(6.2,1.5,1.5,1.0,'main\nsquash merge'),
        (8.2,1.5,1.5,1.0,'Pages\nodbiór'),
    ], [((1.75,2),(2.15,2),''),((3.75,2),(4.15,2),''),((5.75,2),(6.15,2),''),((7.75,2),(8.15,2),'')], (10,2.6))
    fig, ax = plt.subplots(figsize=(10,3.25))
    labels=['Model i repozytorium','Przedmioty, zadania i terminy','Kopia JSON i pomoc','Interfejs i jakość','Dokumentacja i odbiór']
    tasks=[(0,3),(0,7),(7,4),(7,7),(5,9)]
    ax.axvspan(-0.4,6.5,color='#f1f1f1');ax.axvspan(6.5,13.6,color='#edf1f5')
    for index,(start,length) in enumerate(tasks):ax.barh(index,length,left=start-0.3,height=.5,color=BLUE)
    ax.scatter([6,13],[5,5],marker='D',color='#a17a31',s=40,zorder=5)
    ax.text(6,4.7,'M1',ha='center');ax.text(13,4.7,'M2',ha='center')
    ax.set_yticks(range(6),labels+['Przeglądy sprintów']);ax.invert_yaxis()
    ax.set_xticks(range(14),['26 X','27','28','29','30','31','1 XI','2','3','4','5','6','7','8 XI'])
    ax.set_xlim(-.4,13.6);ax.tick_params(axis='x',labelsize=9);ax.grid(axis='x',alpha=.22);ax.set_axisbelow(True)
    fig.tight_layout();fig.savefig(ASSETS/'gantt.png',dpi=220,facecolor='white');plt.close(fig)
    fig, axes=plt.subplots(1,2,figsize=(10,3.25),sharex=True)
    for ax,values,title in zip(axes,[[27,24,21,18,13,9,4,0],[19,19,16,12,8,5,2,0]],['Sprint 1  27 SP','Sprint 2  19 SP']):
        ax.plot(range(8),[values[0]*(1-x/7) for x in range(8)],'--',color='#999999',label='Linia planowana')
        ax.plot(range(8),values,'o-',color=BLUE,label='Przebieg symulowany')
        ax.set(title=title,xlabel='Dzień sprintu',ylabel='Pozostałe SP',xticks=range(8),ylim=(0,30));ax.grid(alpha=.2)
    axes[1].legend(fontsize=9,frameon=False);fig.tight_layout();fig.savefig(ASSETS/'burndown.png',dpi=220,facecolor='white');plt.close(fig)

if __name__ == '__main__': generate()
