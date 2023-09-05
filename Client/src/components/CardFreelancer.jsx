import { Link } from "react-router-dom";

export default function CardFreelancer(props) {
  const imagen =
    "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/334329899_876764810273298_6302666173096829878_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeHU95Ymq4GCpkEqb-oy8Hyl8gJwjBiMmC_yAnCMGIyYL-5_kW7hLMbOSYXOSJynfgvPHpvRqcWzk_Vp-xdXs4aB&_nc_ohc=WBxFURZwU38AX_eUgf5&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCexbdvkBnK_q_6VGU3pIHtZ91gv3x0DhejWt8Cm7miaQ&oe=64FC37C4";
  return (
    <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[400px] flex justify-center">
      <Link>
        <img className="h-[400px] rounded-[666px] " src={imagen} />
        <section>
          <h1 className="font-topmodern">{props.name}</h1>

          <h3 className="font-topmodern">{props.location.country}</h3>
          <h4 className="font-topmodern">{props.description}</h4>
        </section>
      </Link>
    </div>
  );
}
