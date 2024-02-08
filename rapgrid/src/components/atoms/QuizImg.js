export default function QuizImg({src, alt}){
  return (
    <img className="object-cover h-80 w-full" src={src} alt={alt}/>
  )
}