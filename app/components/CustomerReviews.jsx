import { Rating } from "@mui/material";

export default function CustomerReviews() {
  const list = [
    {
      id: 1,
      name: "Penny albritoon",
      message:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      rating: 4.5,
      imageLink:
        "https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Oscar Nommanee",
      message:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      rating: 5,
      imageLink:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Emma Watsom",
      message:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      rating: 3.5,
      imageLink:
        "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <section className="flex justify-center">
      <div className="w-full p-4 md:max-w-[900px] flex flex-col gap-3">
        <h2 className="text-center font-semibold text-lg">
          Our Customers love
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list?.map((item, key) => {
            return (
              <div
                key={item.id}
                className="flex flex-col gap-2 p-4 rounded-lg justify-center items-center border"
              >
                <img
                  src={item?.imageLink}
                  alt={item?.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
                <h1 className="text-sm font-semibold">{item?.name}</h1>
                <Rating
                  size="small"
                  name="customer-rating"
                  defaultValue={item?.rating}
                  precision={item?.rating}
                  readOnly
                />
                <p className="text-sm text-gray-500 text-center">
                  {item?.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
