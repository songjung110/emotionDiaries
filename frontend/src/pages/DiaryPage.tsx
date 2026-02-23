import { useLocation, useNavigate } from 'react-router-dom';
import styles from './DiaryPage.module.css';
import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
// @ts-ignore
import * as brush from 'p5.brush';


const EmotionList = [
    '평온',
    '우울',
    '불안',
    '분노',
] as const;
type Emotion = typeof EmotionList[number];

interface BrushConfig {
    name: string;
    color: string;
    bleed: number;
    scale: number;
}

const emotionToBrushConfig: Record<Emotion, BrushConfig> = {
    평온: {
        name: 'marker',
        color: '#c0ffc3',
        bleed: 0.1,
        scale: 1.2
    },
    우울: {
        name: 'charcoal',
        color: '#4a16aaff',
        bleed: 0.5,
        scale: 1.5
    },
    불안: {
        name: 'cpencil',
        color: 'rgb(86, 114, 83)',
        bleed: 0.8,
        scale: 1.0
    },
    분노: {
        name: 'spray',
        color: 'rgb(255, 105, 105)',
        bleed: 10,
        scale: 1.0
    },
}

function DiaryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const canvasParentRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const p5Ref = useRef<p5 | null>(null);

    const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('평온');
    const emotionRef = useRef<Emotion>('평온');
    const bgColorRef = useRef<string>('#ffffff');

    const {date} = location.state;
    
    const handleClear = () => {
        p5Ref.current?.clear();
        p5Ref.current?.background(bgColorRef.current);
    }
    const handleSave = () => {

    }

    const handleEmotionSelect = (emotion : Emotion) => {
        setSelectedEmotion(emotion);
        emotionRef.current = emotion;
    }

    const handleBgColorChange = (hex: string) =>{
        bgColorRef.current = hex;
        if(!canvasParentRef.current) return;

        canvasParentRef.current.style.backgroundColor = hex;

        p5Ref.current?.background(hex);
    }

    useEffect(()=>{
        const sketch = (p: p5) => {
            p.setup = () =>{
                const canvas = p.createCanvas(360, 520, p.WEBGL);
                if(!canvasParentRef.current) return;
                
                canvas.parent(canvasParentRef.current);
                canvasParentRef.current.style.backgroundColor = bgColorRef.current;

                canvasRef.current = canvas.elt;

                brush.instance(p);
                brush.load();

                console.log('set u0')
            }
            p.draw = () =>{
                if(!p.mouseIsPressed) return;

                if(p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return;

                const emotion = emotionRef.current;
                const config = emotionToBrushConfig[emotion];

                brush.pick(config.name);
                brush.stroke(config.color);
                brush.bleed(config.bleed);
                brush.strokeWeight(config.scale);
                brush.line(
                    p.pmouseX - p.width / 2,
                    p.pmouseY - p.height / 2,
                    p.mouseX - p.width / 2,
                    p.mouseY - p.height / 2,
                )
            }

        }
        p5Ref.current = new p5(sketch);

        return () => {
            p5Ref.current?.remove();
            p5Ref.current = null;
        }
    }, [])

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <h2 className={styles.title}>
                    오늘의 감정 그리기
                </h2>
                <button onClick={()=>{ navigate(-1)}}>X</button>
            </header>
            <div className={styles.section}>
                <span className={styles.label}>감정 선택</span>
                <div className={styles.emotionButtons}>
                    {EmotionList.map(emotion => (
                        <button 
                            key={emotion}
                            style={{
                                border: emotion === selectedEmotion ? '2px solid #000000': ''
                            }}
                            onClick={() => handleEmotionSelect(emotion)}
                        >{emotion}</button>

                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.label}>배경색</div>
                <input 
                    type={'color'}
                    className={styles.colorpicker} 
                    defaultValue={bgColorRef.current}
                    onChange={event => handleBgColorChange(event.target.value)}
                    />
            </div>

            <div className={styles.canvasContainer} ref={canvasParentRef} />


            <div className={styles.actions}>
                <button onClick={handleClear} className={styles.actionButton}>지우기</button>
                <button onClick={handleSave} className={styles.actionButton}>생성하기</button>
            </div>
        </div>
    )
}
export default DiaryPage;