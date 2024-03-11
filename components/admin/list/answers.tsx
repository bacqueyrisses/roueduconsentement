import { Card, List, ListItem } from "@tremor/react";

export function AnswersList({ user }) {
  const cities = [
    {
      city: "Athens",
      rating: "2 open PR",
    },
    {
      city: "Lucerne",
      rating: "1 open PR",
    },
    {
      city: "Zurich",
      rating: "0 open PR",
    },
    {
      city: "Vienna",
      rating: "1 open PR",
    },
    {
      city: "Lissbon",
      rating: "0 open PR",
    },
  ];
  return (
    <Card className="mx-auto max-w-2xl">
      <h3 className="dark:text-dark-tremor-content-strong font-medium text-tremor-content-strong">
        Réponses de {user.pseudo}
      </h3>
      <List className="mt-2">
        {cities.map((item) => (
          <ListItem key={item.city}>
            <span>{item.city}</span>
            <span>{item.rating}</span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
